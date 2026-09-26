import React, { useState } from 'react';
import { useFirebase, InquiryRecord, InquiryStatus } from '../context/FirebaseContext';
import firebaseConfig from '../../firebase-applet-config.json';

interface EditorialWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditorialWorkspaceModal: React.FC<EditorialWorkspaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    user,
    isAdmin,
    unauthorizedDomain,
    clearUnauthorizedDomain,
    inquiries,
    dynamicPortfolioItems,
    signIn,
    signOutUser,
    updateInquiryStatus,
    updateOwnInquiry,
    removeInquiry,
    addPortfolioItem,
    togglePortfolioItemVisibility,
    removePortfolioItem,
  } = useFirebase();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'portfolio'>('inquiries');
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [editProjectType, setEditProjectType] = useState('SEO Content Strategy');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // Portfolio item creation state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<
    'SEO & Content' | 'B2B' | 'Research' | 'Content Strategy' | 'Creative'
  >('SEO & Content');
  const [summary, setSummary] = useState('');
  const [impactMetric, setImpactMetric] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [published, setPublished] = useState(true);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setActionError(null);
    setIsBusy(true);
    try {
      await signIn();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleCopyDomain = async (domain: string) => {
    try {
      await navigator.clipboard.writeText(domain);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2500);
    } catch {
      // Ignore clipboard error
    }
  };

  const handleStatusChange = async (inquiry: InquiryRecord, nextStatus: InquiryStatus) => {
    setActionError(null);
    setIsBusy(true);
    try {
      await updateInquiryStatus(inquiry, nextStatus);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update status.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleSaveOwnInquiry = async (inquiry: InquiryRecord) => {
    if (editMessage.trim().length < 15) {
      setActionError('Message must be at least 15 characters.');
      return;
    }
    setActionError(null);
    setIsBusy(true);
    try {
      await updateOwnInquiry(inquiry, {
        message: editMessage,
        projectType: editProjectType,
      });
      setEditingInquiryId(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update inquiry.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleCreatePortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3 || summary.trim().length < 10 || impactMetric.trim().length < 2) {
      setActionError('Please complete title, summary (10+ chars), and key outcome metric.');
      return;
    }
    setActionError(null);
    setIsBusy(true);
    try {
      await addPortfolioItem({
        title,
        category,
        summary,
        impactMetric,
        externalUrl,
        published,
      });
      setTitle('');
      setSummary('');
      setImpactMetric('');
      setExternalUrl('');
      setPublished(true);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to create portfolio entry.');
    } finally {
      setIsBusy(false);
    }
  };

  const statusBadgeStyle = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return 'bg-[#ffdbcf] text-[#994524]';
      case 'in_review':
        return 'bg-amber-100 text-amber-800';
      case 'replied':
        return 'bg-emerald-100 text-emerald-800';
      case 'closed':
        return 'bg-[#eae8e5] text-[#546252]';
    }
  };

  const firebaseAuthSettingsUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Client & Editorial Workspace"
    >
      <div className="bg-[#fbf9f6] border border-[#e4e2df] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-[#e4e2df] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#994524] font-semibold">
              Editorial &amp; Client Workspace
            </span>
            <h2 className="font-serif text-2xl text-[#1b1c1a] font-medium">
              Inquiries &amp; Live Portfolio Database
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f3f0] border border-[#e4e2df] text-xs text-[#55433c]">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="truncate max-w-[180px]">{user.email}</span>
                <button
                  onClick={signOutUser}
                  className="ml-1 text-[#994524] hover:underline font-semibold cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isBusy}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#f5f3f0] hover:bg-[#efeeeb] border border-[#e4e2df] text-xs font-semibold text-[#1b1c1a] transition-colors cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px] text-[#994524]">
                  cloud_sync
                </span>
                <span>Connect Google Account</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#efeeeb] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {unauthorizedDomain && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#1b1c1a] space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold text-amber-900">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span>Authorize Domain in Firebase for Google Sign-In</span>
                </div>
                <button
                  onClick={clearUnauthorizedDomain}
                  className="text-amber-800 hover:underline font-semibold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[#55433c] leading-relaxed">
                Your workspace and inquiries work right now in this browser. To enable Google Sign-In popup sync on <strong className="text-[#1b1c1a]">{unauthorizedDomain}</strong>, add this domain to your Firebase project&apos;s Authorized Domains list:
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <code className="px-2.5 py-1.5 rounded bg-white border border-amber-200 text-[#1b1c1a] font-mono text-[11px]">
                  {unauthorizedDomain}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyDomain(unauthorizedDomain)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#efeeeb] border border-[#e4e2df] text-[11px] font-semibold text-[#1b1c1a] cursor-pointer"
                >
                  {copiedDomain ? 'Copied!' : 'Copy Domain'}
                </button>
                <a
                  href={firebaseAuthSettingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-[11px] font-semibold inline-flex items-center gap-1"
                >
                  <span>Open Firebase Auth Settings</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          )}

          {actionError && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between">
              <span>{actionError}</span>
              <button
                onClick={() => setActionError(null)}
                className="text-red-800 font-semibold ml-4 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-[#e4e2df] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#994524] text-white'
                    : 'bg-white text-[#55433c] hover:bg-[#efeeeb] border border-[#e4e2df]'
                }`}
              >
                Client Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-[#994524] text-white'
                    : 'bg-white text-[#55433c] hover:bg-[#efeeeb] border border-[#e4e2df]'
                }`}
              >
                Live Portfolio Entries ({dynamicPortfolioItems.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-8 bg-white rounded-xl border border-[#e4e2df] text-center">
                  <p className="font-serif text-lg text-[#1b1c1a]">
                    No inquiries recorded yet
                  </p>
                  <p className="text-xs text-[#55433c] mt-1">
                    Submitted inquiries from the &ldquo;Let&apos;s Work Together&rdquo; form are saved automatically and appear here.
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 bg-white rounded-xl border border-[#e4e2df] shadow-2xs space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-serif text-lg text-[#1b1c1a] font-medium">
                            {inq.name}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider ${statusBadgeStyle(
                              inq.status
                            )}`}
                          >
                            {inq.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-[#546252] mt-0.5">
                          {inq.email} • <strong className="text-[#1b1c1a]">{inq.projectType}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAdmin && (
                          <select
                            aria-label="Update inquiry status"
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(inq, e.target.value as InquiryStatus)
                            }
                            disabled={isBusy}
                            className="px-3 py-1.5 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg text-[#1b1c1a] font-medium focus:outline-none focus:border-[#994524]"
                          >
                            <option value="new">New</option>
                            <option value="in_review">In Review</option>
                            <option value="replied">Replied</option>
                            <option value="closed">Closed (Terminal)</option>
                          </select>
                        )}

                        {inq.status === 'new' && editingInquiryId !== inq.id && (
                          <button
                            onClick={() => {
                              setEditingInquiryId(inq.id);
                              setEditMessage(inq.message);
                              setEditProjectType(inq.projectType);
                            }}
                            className="px-3 py-1.5 text-xs font-semibold text-[#994524] bg-[#ffdbcf]/40 hover:bg-[#ffdbcf] rounded-lg transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                        )}

                        {(isAdmin || inq.status === 'new') && (
                          <button
                            onClick={() => removeInquiry(inq.id)}
                            disabled={isBusy}
                            className="px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                    {editingInquiryId === inq.id ? (
                      <div className="space-y-3 pt-2 border-t border-[#efeeeb]">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                            Project Type
                          </label>
                          <select
                            value={editProjectType}
                            onChange={(e) => setEditProjectType(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                          >
                            <option value="SEO Content Strategy">SEO Content Strategy</option>
                            <option value="B2B & Research Synthesis">B2B &amp; Research Synthesis</option>
                            <option value="Website & Conversion Copy">Website &amp; Conversion Copy</option>
                            <option value="Editorial Calendar Governance">Editorial Calendar Governance</option>
                            <option value="Thought Leadership & Social">Thought Leadership &amp; Social</option>
                            <option value="Full-Time / Contract Role">Full-Time / Contract Role</option>
                            <option value="Other Inquiries">Other Inquiries</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                            Project Summary (15–3000 chars)
                          </label>
                          <textarea
                            rows={3}
                            maxLength={3000}
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingInquiryId(null)}
                            className="px-3 py-1.5 text-xs text-[#55433c] hover:text-[#1b1c1a] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveOwnInquiry(inq)}
                            disabled={isBusy}
                            className="px-4 py-1.5 bg-[#994524] text-white text-xs font-semibold rounded-lg cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-[#55433c] whitespace-pre-line leading-relaxed bg-[#fbf9f6] p-3.5 rounded-lg border border-[#efeeeb]">
                        {inq.message}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Portfolio Manager */}
          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Add New Portfolio Item Form */}
              <form
                onSubmit={handleCreatePortfolioItem}
                className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#e4e2df] space-y-3.5 h-fit"
              >
                <h3 className="font-serif text-lg text-[#1b1c1a] font-medium">
                  Add Portfolio Entry
                </h3>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                    Title (3–160 chars) *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={3}
                    maxLength={160}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Global EV Battery Supply Chain Analysis"
                    className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                  >
                    <option value="SEO & Content">SEO &amp; Content</option>
                    <option value="B2B">B2B</option>
                    <option value="Research">Research</option>
                    <option value="Content Strategy">Content Strategy</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                    Key Outcome / Metric (2–120 chars) *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={impactMetric}
                    onChange={(e) => setImpactMetric(e.target.value)}
                    placeholder="e.g. Top-3 SERP ranking for high-intent B2B terms"
                    className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                    Summary (10–600 chars) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    minLength={10}
                    maxLength={600}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Concise summary of the research methodology and editorial execution..."
                    className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#546252] mb-1">
                    External Article URL (Optional)
                  </label>
                  <input
                    type="url"
                    maxLength={500}
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-[#fbf9f6] border border-[#e4e2df] rounded-lg"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-[#1b1c1a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded border-[#e4e2df] text-[#994524]"
                  />
                  <span>Publish immediately to Selected Work</span>
                </label>

                <button
                  type="submit"
                  disabled={isBusy}
                  className="w-full py-2.5 px-4 bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  Save to Portfolio
                </button>
              </form>

              {/* Existing Dynamic Portfolio Items */}
              <div className="lg:col-span-7 space-y-3">
                {dynamicPortfolioItems.length === 0 ? (
                  <div className="p-8 bg-white rounded-xl border border-[#e4e2df] text-center">
                    <p className="font-serif text-base text-[#1b1c1a]">
                      No custom portfolio entries yet
                    </p>
                    <p className="text-xs text-[#55433c] mt-1">
                      Entries added on the left are merged directly into your Selected Work showcase.
                    </p>
                  </div>
                ) : (
                  dynamicPortfolioItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-xl border border-[#e4e2df] flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#994524]">
                            {item.category} • {item.published ? 'Published' : 'Draft'}
                          </span>
                          <h4 className="font-serif text-base text-[#1b1c1a] font-medium">
                            {item.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePortfolioItemVisibility(item)}
                            className="px-2.5 py-1 text-[11px] font-semibold border border-[#e4e2df] rounded-md hover:bg-[#efeeeb] cursor-pointer"
                          >
                            {item.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => removePortfolioItem(item.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-50 rounded-md cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#55433c]">{item.summary}</p>
                      <p className="text-[11px] text-[#546252] font-medium">
                        Outcome: {item.impactMetric}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
