# Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Global Default-Deny**: All paths not explicitly matched (`/inquiries/{inquiryId}`, `/portfolioItems/{itemId}`, `/admins/{adminId}`) are unconditionally denied (`allow read, write: if false;`).
2. **Verified Authentication Requirement**: Any write operation across `/inquiries`, `/portfolioItems`, and `/admins` requires an authenticated user with `request.auth.token.email_verified == true`.
3. **ID Hardening Invariant**: Every single-document path variable (`inquiryId`, `itemId`, `adminId`) must match `^[a-zA-Z0-9_\-]+$` and have `.size() <= 128`.
4. **Inquiry Ownership & PII Isolation**:
   - An `Inquiry` document contains PII (`email`, `name`, `message`).
   - Only the original author (`resource.data.authorId == request.auth.uid`) or a verified administrator (`isAdmin()`) may `get` or `list` an inquiry.
   - Upon creation, `incoming().authorId == request.auth.uid`, `incoming().status == 'new'`, `incoming().createdAt == request.time`, and `incoming().updatedAt == request.time`.
   - Terminal State Locking: Once `existing().status == 'closed'`, non-admin updates are blocked (`existing().status != 'closed' || isAdmin()`).
   - Immortal Fields: `authorId`, `createdAt`, `name`, and `email` cannot be altered during an `update`.
5. **PortfolioItem Integrity**:
   - Only a verified administrator (`isAdmin()`) may `create`, `update`, or `delete` a `PortfolioItem`.
   - Public `get` and `list` operations are restricted strictly to documents where `resource.data.published == true` (unless the requester is `isAdmin()`).
6. **Admin Registry (`/admins/{adminId}`)**:
   - Only the bootstrapped owner (`request.auth.token.email == 'bajajseapee@gmail.com' && request.auth.token.email_verified == true`) may create their own `/admins/{adminId}` record where `adminId == request.auth.uid` and `incoming().uid == request.auth.uid`.
   - No client may self-assign an admin record for another UID or with an unverified email.

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 — Identity Spoofing on Inquiry Creation**:
   - Authenticated user `uid_attacker` creates `/inquiries/inq_1` with `{ "authorId": "uid_victim", ... }`.
   - Expected Result: `PERMISSION_DENIED` (violates `data.authorId == request.auth.uid`).
2. **Payload 2 — Unverified Email Write Attempt**:
   - Authenticated user with `email_verified: false` attempts to create `/inquiries/inq_2`.
   - Expected Result: `PERMISSION_DENIED` (violates `isVerifiedUser()`).
3. **Payload 3 — Shadow Field Injection ("Ghost Field")**:
   - Authenticated user sends `{ ..., "isPriority": true }` on create or update of `/inquiries/inq_3`.
   - Expected Result: `PERMISSION_DENIED` (blocked by `data.keys().hasOnly(...)` and `affectedKeys().hasOnly(...)`).
4. **Payload 4 — State Shortcutting on Inquiry Creation**:
   - Authenticated user attempts to create `/inquiries/inq_4` with `status: "replied"` instead of `"new"`.
   - Expected Result: `PERMISSION_DENIED` (violates `incoming().status == 'new'`).
5. **Payload 5 — Terminal State Mutation Bypass**:
   - Inquiry owner attempts to update `message` on `/inquiries/inq_5` when `existing().status == 'closed'`.
   - Expected Result: `PERMISSION_DENIED` (blocked by terminal state lock).
6. **Payload 6 — Tier-2 Privilege Escalation (Owner Mutating Admin Status)**:
   - Regular user (`authorId == request.auth.uid`) attempts to update `status` from `'new'` to `'in_review'` on `/inquiries/inq_6`.
   - Expected Result: `PERMISSION_DENIED` (owner action branch only permits `['message', 'projectType', 'updatedAt']`).
7. **Payload 7 — Immortal Field Tampering**:
   - Admin or owner attempts to modify `createdAt` or `authorId` during an update on `/inquiries/inq_7`.
   - Expected Result: `PERMISSION_DENIED` (blocked by immutable field invariant).
8. **Payload 8 — Temporal Spoofing (Forged Client Timestamp)**:
   - Client sends a past or future timestamp `createdAt` (`request.time - 1000s`) when creating `/inquiries/inq_8`.
   - Expected Result: `PERMISSION_DENIED` (blocked by `incoming().createdAt == request.time`).
9. **Payload 9 — Resource / ID Poisoning ("Denial of Wallet")**:
   - Attacker attempts to create `/inquiries/bad$id!@#` or a 10,000-character `message`.
   - Expected Result: `PERMISSION_DENIED` (blocked by `isValidId(inquiryId)` and `data.message.size() <= 3000`).
10. **Payload 10 — PII Blanket Read / Unauthorized Scraping**:
    - Authenticated user `uid_attacker` attempts `get` or `list` on `/inquiries` belonging to `uid_victim`.
    - Expected Result: `PERMISSION_DENIED` (blocked by `resource.data.authorId == request.auth.uid || isAdmin()`).
11. **Payload 11 — Unpublished Portfolio Item Scraping**:
    - Non-admin user attempts `get` or `list` on `/portfolioItems/item_draft` where `published == false`.
    - Expected Result: `PERMISSION_DENIED` (blocked by `resource.data.published == true || isAdmin()`).
12. **Payload 12 — Self-Assigned Admin Escalation**:
    - Authenticated user `attacker@example.com` (or unverified `bajajseapee@gmail.com`) attempts to create `/admins/uid_attacker`.
    - Expected Result: `PERMISSION_DENIED` (blocked by bootstrapped verified admin email check).
