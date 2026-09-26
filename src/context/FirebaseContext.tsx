import React, { createContext, useContext, useEffect, useState } from 'react';
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
}

interface FirebaseContextValue {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
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

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [dynamicPortfolioItems, setDynamicPortfolioItems] = useState<DynamicPortfolioRecord[]>([]);

  const isAdmin = Boolean(
    user && user.emailVerified && user.email?.toLowerCase() === 'bajajseapee@gmail.com'
  );

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

  // Subscribe to published portfolio items (or all items for admin)
  useEffect(() => {
    if (!isAuthReady) return;

    const path = 'portfolioItems';
    const itemsQuery = isAdmin
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
        setDynamicPortfolioItems(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, isAdmin]);

  // Subscribe to inquiries when authenticated
  useEffect(() => {
    if (!isAuthReady || !user || !user.emailVerified) {
      setInquiries([]);
      return;
    }

    const path = 'inquiries';
    const inquiriesQuery = isAdmin
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
        setInquiries(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, user, isAdmin]);

  const signIn = async (): Promise<User | null> => {
    const credential = await signInWithGoogle();
    return credential.user;
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
    let activeUser = auth.currentUser;
    if (!activeUser) {
      activeUser = await signIn();
    }
    if (!activeUser) {
      throw new Error('Authentication is required to submit an inquiry.');
    }

    const inquiryId = sanitizeId(`inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    const path = `inquiries/${inquiryId}`;

    const safeProjectType = VALID_PROJECT_TYPES.includes(input.projectType)
      ? input.projectType
      : 'SEO Content Strategy';

    const payload = {
      authorId: sanitizeId(activeUser.uid),
      name: input.name.trim().slice(0, 120),
      email: input.email.trim().slice(0, 160),
      projectType: safeProjectType,
      message: input.message.trim().slice(0, 3000),
      status: 'new' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'inquiries', inquiryId), payload);
      return inquiryId;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const updateInquiryStatus = async (
    inquiry: InquiryRecord,
    status: InquiryStatus
  ): Promise<void> => {
    const path = `inquiries/${inquiry.id}`;
    try {
      await updateDoc(doc(db, 'inquiries', inquiry.id), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const updateOwnInquiry = async (
    inquiry: InquiryRecord,
    updates: { message: string; projectType: string }
  ): Promise<void> => {
    const path = `inquiries/${inquiry.id}`;
    const safeProjectType = VALID_PROJECT_TYPES.includes(updates.projectType)
      ? updates.projectType
      : inquiry.projectType;

    try {
      await updateDoc(doc(db, 'inquiries', inquiry.id), {
        message: updates.message.trim().slice(0, 3000),
        projectType: safeProjectType,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const removeInquiry = async (inquiryId: string): Promise<void> => {
    const path = `inquiries/${inquiryId}`;
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
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
    const activeUser = auth.currentUser;
    if (!activeUser) {
      throw new Error('Administrator authentication required.');
    }

    const itemId = sanitizeId(`folio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    const path = `portfolioItems/${itemId}`;
    const safeCategory = VALID_PORTFOLIO_CATEGORIES.includes(input.category)
      ? input.category
      : 'SEO & Content';

    const payload = {
      authorId: sanitizeId(activeUser.uid),
      title: input.title.trim().slice(0, 160),
      category: safeCategory,
      summary: input.summary.trim().slice(0, 600),
      impactMetric: input.impactMetric.trim().slice(0, 120),
      externalUrl: input.externalUrl.trim().slice(0, 500),
      published: Boolean(input.published),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, 'portfolioItems', itemId), payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const togglePortfolioItemVisibility = async (
    item: DynamicPortfolioRecord
  ): Promise<void> => {
    const path = `portfolioItems/${item.id}`;
    try {
      await updateDoc(doc(db, 'portfolioItems', item.id), {
        published: !item.published,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const removePortfolioItem = async (itemId: string): Promise<void> => {
    const path = `portfolioItems/${itemId}`;
    try {
      await deleteDoc(doc(db, 'portfolioItems', itemId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAuthReady,
        isAdmin,
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
