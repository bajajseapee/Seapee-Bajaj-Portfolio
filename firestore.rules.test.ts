/**
 * Firestore Security Rules Verification Suite (Phase 0 TDD)
 * Verifies that all "Dirty Dozen" adversarial payloads return PERMISSION_DENIED.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: {
    uid: string;
    email: string;
    email_verified: boolean;
  } | null;
  payload?: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Identity Spoofing on Inquiry Creation',
    collection: 'inquiries',
    docId: 'inq_1',
    operation: 'create',
    auth: { uid: 'uid_attacker', email: 'attacker@example.com', email_verified: true },
    payload: {
      authorId: 'uid_victim',
      name: 'Maya Sharma',
      email: 'maya@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Looking for a comprehensive B2B content audit and roadmap.',
      status: 'new',
      createdAt: 'SERVER_TIMESTAMP',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Unverified Email Write Attempt',
    collection: 'inquiries',
    docId: 'inq_2',
    operation: 'create',
    auth: { uid: 'uid_unverified', email: 'user@example.com', email_verified: false },
    payload: {
      authorId: 'uid_unverified',
      name: 'Unverified User',
      email: 'user@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Attempting to write without verifying email address first.',
      status: 'new',
      createdAt: 'SERVER_TIMESTAMP',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Shadow Field Injection ("Ghost Field")',
    collection: 'inquiries',
    docId: 'inq_3',
    operation: 'create',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      authorId: 'uid_user',
      name: 'Maya Sharma',
      email: 'maya@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Valid length inquiry message with an injected shadow field.',
      status: 'new',
      isVerifiedAdmin: true,
      createdAt: 'SERVER_TIMESTAMP',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'State Shortcutting on Inquiry Creation',
    collection: 'inquiries',
    docId: 'inq_4',
    operation: 'create',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      authorId: 'uid_user',
      name: 'Maya Sharma',
      email: 'maya@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Attempting to skip initial workflow state to replied.',
      status: 'replied',
      createdAt: 'SERVER_TIMESTAMP',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Terminal State Mutation Bypass',
    collection: 'inquiries',
    docId: 'inq_5_closed',
    operation: 'update',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      message: 'Trying to mutate an already closed inquiry record.',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Tier-2 Privilege Escalation (Owner Mutating Status)',
    collection: 'inquiries',
    docId: 'inq_6',
    operation: 'update',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      status: 'replied',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Immortal Field Tampering (Mutating authorId)',
    collection: 'inquiries',
    docId: 'inq_7',
    operation: 'update',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      authorId: 'uid_other',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Temporal Spoofing (Forged Client Timestamp)',
    collection: 'inquiries',
    docId: 'inq_8',
    operation: 'create',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      authorId: 'uid_user',
      name: 'Maya Sharma',
      email: 'maya@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Forging a past timestamp instead of request.time.',
      status: 'new',
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'ID Poisoning Guard',
    collection: 'inquiries',
    docId: 'invalid$doc!id',
    operation: 'create',
    auth: { uid: 'uid_user', email: 'user@example.com', email_verified: true },
    payload: {
      authorId: 'uid_user',
      name: 'Maya Sharma',
      email: 'maya@example.com',
      projectType: 'SEO Content Strategy',
      message: 'Valid payload but malicious document ID characters.',
      status: 'new',
      createdAt: 'SERVER_TIMESTAMP',
      updatedAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'PII Blanket Read / Cross-User Inquiry Read',
    collection: 'inquiries',
    docId: 'inq_victim',
    operation: 'get',
    auth: { uid: 'uid_attacker', email: 'attacker@example.com', email_verified: true },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Unpublished Portfolio Item Scraping',
    collection: 'portfolioItems',
    docId: 'item_draft',
    operation: 'get',
    auth: { uid: 'uid_visitor', email: 'visitor@example.com', email_verified: true },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Self-Assigned Admin Escalation',
    collection: 'admins',
    docId: 'uid_attacker',
    operation: 'create',
    auth: { uid: 'uid_attacker', email: 'attacker@example.com', email_verified: true },
    payload: {
      uid: 'uid_attacker',
      role: 'admin',
      createdAt: 'SERVER_TIMESTAMP'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  }
];
