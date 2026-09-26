import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  signInWithGoogle,
  logOutUser,
  handleFirestoreError,
  OperationType,
} from '../firebase';

export type InquiryStatus = 'new' | 'in_review' | 'replied' | 'closed';

export interface InquiryRecord {
  id: string;
  authorId: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status: InquiryStatus;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  isLocalOnly?: boolean;
}

export interface DynamicPortfolioRecord {
  id: string;
  authorId: string;
  title: string;
  category: 'SEO & Content' | 'B2B' | 'Research' | 'Content Strategy' | 'Creative';
  summary: string;
  impactMetric: string;
  externalUrl: string;
  published: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  isLocalOnly?: boolean;
}

interface FirebaseContextValue {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  unauthorizedDomain: string | null;
  clearUnauthorizedDomain: () => void;
  inquiries: InquiryRecord[];
  dynamicPortfolioItems: DynamicPortfolioRecord[];
  signIn: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  submitInquiry: (input: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  }) => Promise<string>;
  updateInquiryStatus: (inquiry: InquiryRecord, status: InquiryStatus) => Promise<void>;
  updateOwnInquiry: (
    inquiry: InquiryRecord,
    updates: { message: string; projectType: string }
  ) => Promise<void>;
  removeInquiry: (inquiryId: string) => Promise<void>;
  addPortfolioItem: (input: {
    title: string;
    category: 'SEO & Content' | 'B2B' | 'Research' | 'Content Strategy' | 'Creative';
    summary: string;
    impactMetric: string;
    externalUrl: string;
    published: boolean;
  }) => Promise<void>;
  togglePortfolioItemVisibility: (item: DynamicPortfolioRecord) => Promise<void>;
  removePortfolioItem: (itemId: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

const LOCAL_INQUIRIES_KEY = 'seapee_workspace_inquiries_v1';
const LOCAL_PORTFOLIO_KEY = 'seapee_workspace_portfolio_v1';

const VALID_PROJECT_TYPES = [
  'SEO Content Strategy',
  'B2B & Research Synthesis',
  'Website & Conversion Copy',
  'Editorial Calendar Governance',
  'Thought Leadership & Social',
  'Full-Time / Contract Role',
  'Other Inquiries',
];

const VALID_PORTFOLIO_CATEGORIES = [
  'SEO & Content',
  'B2B',
  'Research',
  'Content Strategy',
  'Creative',
] as const;

function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 128) || `doc_${Date.now()}`;
}

function loadLocalInquiries(): InquiryRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalInquiries(items: InquiryRecord[]) {
  try {
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

function loadLocalPortfolio(): DynamicPortfolioRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_PORTFOLIO_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalPortfolio(items: DynamicPortfolioRecord[]) {
  try {
    localStorage.setItem(LOCAL_PORTFOLIO_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

function isUnauthorizedDomainError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  const code = (err as { code?: string })?.code || '';
  return code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain');
}

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [cloudInquiries, setCloudInquiries] = useState<InquiryRecord[]>([]);
  const [localInquiries, setLocalInquiries] = useState<InquiryRecord[]>(() => loadLocalInquiries());
  const [cloudPortfolioItems, setCloudPortfolioItems] = useState<DynamicPortfolioRecord[]>([]);
  const [localPortfolioItems, setLocalPortfolioItems] = useState<DynamicPortfolioRecord[]>(() =>
    loadLocalPortfolio()
  );

  const isCloudAdmin = Boolean(
    user && user.emailVerified && user.email?.toLowerCase() === 'bajajseapee@gmail.com'
  );
  // Allow full editorial workspace controls when signed in as admin or in local workspace mode
  const isAdmin = isCloudAdmin || !user;

  // Track authentication state and bootstrap admin record if owner signs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (
        currentUser &&
        currentUser.emailVerified &&
        currentUser.email?.toLowerCase() === 'bajajseapee@gmail.com'
      ) {
        const adminPath = `admins/${currentUser.uid}`;
        try {
          const adminDocRef = doc(db, 'admins', currentUser.uid);
          const snap = await getDoc(adminDocRef);
          if (!snap.exists()) {
            await setDoc(adminDocRef, {
              uid: currentUser.uid.slice(0, 128),
              role: 'admin',
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, adminPath);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to published portfolio items (or all items for verified cloud admin)
  useEffect(() => {
    if (!isAuthReady) return;

    const path = 'portfolioItems';
    const itemsQuery = isCloudAdmin
      ? query(collection(db, 'portfolioItems'))
      : query(collection(db, 'portfolioItems'), where('published', '==', true));

    const unsubscribe = onSnapshot(
      itemsQuery,
      (snapshot) => {
        const items: DynamicPortfolioRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authorId: String(data.authorId || ''),
            title: String(data.title || ''),
            category: (data.category as DynamicPortfolioRecord['category']) || 'SEO & Content',
            summary: String(data.summary || ''),
            impactMetric: String(data.impactMetric || ''),
            externalUrl: String(data.externalUrl || ''),
            published: Boolean(data.published),
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null,
          };
        });
        items.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() ?? 0;
          const timeB = b.createdAt?.toMillis?.() ?? 0;
          return timeB - timeA;
        });
        setCloudPortfolioItems(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, isCloudAdmin]);

  // Subscribe to cloud inquiries when authenticated
  useEffect(() => {
    if (!isAuthReady || !user || !user.emailVerified) {
      setCloudInquiries([]);
      return;
    }

    const path = 'inquiries';
    const inquiriesQuery = isCloudAdmin
      ? query(collection(db, 'inquiries'))
      : query(collection(db, 'inquiries'), where('authorId', '==', user.uid));

    const unsubscribe = onSnapshot(
      inquiriesQuery,
      (snapshot) => {
        const list: InquiryRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authorId: String(data.authorId || ''),
            name: String(data.name || ''),
            email: String(data.email || ''),
            projectType: String(data.projectType || 'SEO Content Strategy'),
            message: String(data.message || ''),
            status: (data.status as InquiryStatus) || 'new',
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null,
          };
        });
        list.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() ?? 0;
          const timeB = b.createdAt?.toMillis?.() ?? 0;
          return timeB - timeA;
        });
        setCloudInquiries(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, user, isCloudAdmin]);

  const inquiries = useMemo(() => {
    const map = new Map<string, InquiryRecord>();
    cloudInquiries.forEach((item) => map.set(item.id, item));
    localInquiries.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  }, [cloudInquiries, localInquiries]);

  const dynamicPortfolioItems = useMemo(() => {
    const map = new Map<string, DynamicPortfolioRecord>();
    cloudPortfolioItems.forEach((item) => map.set(item.id, item));
    localPortfolioItems.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  }, [cloudPortfolioItems, localPortfolioItems]);

  const signIn = async (): Promise<User | null> => {
    setUnauthorizedDomain(null);
    try {
      const credential = await signInWithGoogle();
      return credential.user;
    } catch (err) {
      if (isUnauthorizedDomainError(err)) {
        const domain =
          typeof window !== 'undefined' && window.location.hostname
            ? window.location.hostname
            : 'your-deployment-domain.vercel.app';
        setUnauthorizedDomain(domain);
        return null;
      }
      throw err;
    }
  };

  const signOutUser = async (): Promise<void> => {
    await logOutUser();
  };

  const submitInquiry = async (input: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  }): Promise<string> => {
    const inquiryId = sanitizeId(`inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    const safeProjectType = VALID_PROJECT_TYPES.includes(input.projectType)
      ? input.projectType
      : 'SEO Content Strategy';

    const trimmedName = input.name.trim().slice(0, 120);
    const trimmedEmail = input.email.trim().slice(0, 160);
    const trimmedMessage = input.message.trim().slice(0, 3000);

    // Always persist in local workspace storage immediately so submission never fails on unauthorized domains
    const localRecord: InquiryRecord = {
      id: inquiryId,
      authorId: auth.currentUser?.uid ? sanitizeId(auth.currentUser.uid) : 'guest_client',
      name: trimmedName,
      email: trimmedEmail,
      projectType: safeProjectType,
      message: trimmedMessage,
      status: 'new',
      createdAt: null,
      updatedAt: null,
      isLocalOnly: !auth.currentUser?.emailVerified,
    };

    const nextLocal = [localRecord, ...localInquiries];
    setLocalInquiries(nextLocal);
    saveLocalInquiries(nextLocal);

    // If user is already signed in with a verified Google account, also write to Firestore
    const activeUser = auth.currentUser;
    if (activeUser && activeUser.emailVerified) {
      const path = `inquiries/${inquiryId}`;
      const payload = {
        authorId: sanitizeId(activeUser.uid),
        name: trimmedName,
        email: trimmedEmail,
        projectType: safeProjectType,
        message: trimmedMessage,
        status: 'new' as const,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      try {
        await setDoc(doc(db, 'inquiries', inquiryId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }

    return inquiryId;
  };

  const updateInquiryStatus = async (
    inquiry: InquiryRecord,
    status: InquiryStatus
  ): Promise<void> => {
    // Update local copy if present
    const nextLocal = localInquiries.map((item) =>
      item.id === inquiry.id ? { ...item, status } : item
    );
    setLocalInquiries(nextLocal);
    saveLocalInquiries(nextLocal);

    if (!inquiry.isLocalOnly && auth.currentUser?.emailVerified) {
      const path = `inquiries/${inquiry.id}`;
      try {
        await updateDoc(doc(db, 'inquiries', inquiry.id), {
          status,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const updateOwnInquiry = async (
    inquiry: InquiryRecord,
    updates: { message: string; projectType: string }
  ): Promise<void> => {
    const safeProjectType = VALID_PROJECT_TYPES.includes(updates.projectType)
      ? updates.projectType
      : inquiry.projectType;
    const trimmedMessage = updates.message.trim().slice(0, 3000);

    const nextLocal = localInquiries.map((item) =>
      item.id === inquiry.id
        ? { ...item, message: trimmedMessage, projectType: safeProjectType }
        : item
    );
    setLocalInquiries(nextLocal);
    saveLocalInquiries(nextLocal);

    if (!inquiry.isLocalOnly && auth.currentUser?.emailVerified) {
      const path = `inquiries/${inquiry.id}`;
      try {
        await updateDoc(doc(db, 'inquiries', inquiry.id), {
          message: trimmedMessage,
          projectType: safeProjectType,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const removeInquiry = async (inquiryId: string): Promise<void> => {
    const target = inquiries.find((i) => i.id === inquiryId);
    const nextLocal = localInquiries.filter((item) => item.id !== inquiryId);
    setLocalInquiries(nextLocal);
    saveLocalInquiries(nextLocal);

    if (target && !target.isLocalOnly && auth.currentUser?.emailVerified) {
      const path = `inquiries/${inquiryId}`;
      try {
        await deleteDoc(doc(db, 'inquiries', inquiryId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, path);
      }
    }
  };

  const addPortfolioItem = async (input: {
    title: string;
    category: 'SEO & Content' | 'B2B' | 'Research' | 'Content Strategy' | 'Creative';
    summary: string;
    impactMetric: string;
    externalUrl: string;
    published: boolean;
  }): Promise<void> => {
    const itemId = sanitizeId(`folio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    const safeCategory = VALID_PORTFOLIO_CATEGORIES.includes(input.category)
      ? input.category
      : 'SEO & Content';

    const trimmedTitle = input.title.trim().slice(0, 160);
    const trimmedSummary = input.summary.trim().slice(0, 600);
    const trimmedMetric = input.impactMetric.trim().slice(0, 120);
    const trimmedUrl = input.externalUrl.trim().slice(0, 500);

    const localItem: DynamicPortfolioRecord = {
      id: itemId,
      authorId: auth.currentUser?.uid ? sanitizeId(auth.currentUser.uid) : 'local_admin',
      title: trimmedTitle,
      category: safeCategory,
      summary: trimmedSummary,
      impactMetric: trimmedMetric,
      externalUrl: trimmedUrl,
      published: Boolean(input.published),
      createdAt: null,
      updatedAt: null,
      isLocalOnly: !isCloudAdmin,
    };

    const nextLocal = [localItem, ...localPortfolioItems];
    setLocalPortfolioItems(nextLocal);
    saveLocalPortfolio(nextLocal);

    if (isCloudAdmin && auth.currentUser) {
      const path = `portfolioItems/${itemId}`;
      const payload = {
        authorId: sanitizeId(auth.currentUser.uid),
        title: trimmedTitle,
        category: safeCategory,
        summary: trimmedSummary,
        impactMetric: trimmedMetric,
        externalUrl: trimmedUrl,
        published: Boolean(input.published),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      try {
        await setDoc(doc(db, 'portfolioItems', itemId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
  };

  const togglePortfolioItemVisibility = async (
    item: DynamicPortfolioRecord
  ): Promise<void> => {
    const nextLocal = localPortfolioItems.map((entry) =>
      entry.id === item.id ? { ...entry, published: !entry.published } : entry
    );
    setLocalPortfolioItems(nextLocal);
    saveLocalPortfolio(nextLocal);

    if (!item.isLocalOnly && isCloudAdmin) {
      const path = `portfolioItems/${item.id}`;
      try {
        await updateDoc(doc(db, 'portfolioItems', item.id), {
          published: !item.published,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  };

  const removePortfolioItem = async (itemId: string): Promise<void> => {
    const target = dynamicPortfolioItems.find((i) => i.id === itemId);
    const nextLocal = localPortfolioItems.filter((entry) => entry.id !== itemId);
    setLocalPortfolioItems(nextLocal);
    saveLocalPortfolio(nextLocal);

    if (target && !target.isLocalOnly && isCloudAdmin) {
      const path = `portfolioItems/${itemId}`;
      try {
        await deleteDoc(doc(db, 'portfolioItems', itemId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, path);
      }
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAuthReady,
        isAdmin,
        unauthorizedDomain,
        clearUnauthorizedDomain: () => setUnauthorizedDomain(null),
        inquiries,
        dynamicPortfolioItems,
        signIn,
        signOutUser,
        submitInquiry,
        updateInquiryStatus,
        updateOwnInquiry,
        removeInquiry,
        addPortfolioItem,
        togglePortfolioItemVisibility,
        removePortfolioItem,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return ctx;
}
