import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, buildGmailComposeUrl } from '../config/siteConfig';
import { useFirebase } from '../context/FirebaseContext';

interface ContactProps {
  initialService?: string;
  onOpenResume: () => void;
  onOpenWorkspace?: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

export const Contact: React.FC<ContactProps> = ({
  initialService,
  onOpenResume,
  onOpenWorkspace,
}) => {
  const { user, inquiries, submitInquiry } = useFirebase();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'SEO Content Strategy');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) {
      setProjectType(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (user) {
      if (!name && user.displayName) {
        setName(user.displayName.slice(0, 120));
      }
      if (!email && user.email) {
        setEmail(user.email.slice(0, 160));
      }
    }
  }, [user]);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name or organization.';
    } else if (trimmedName.length > 120) {
      errs.name = 'Name must be 120 characters or fewer.';
    }

    if (!trimmedEmail) {
      errs.email = 'Please provide a valid email address.';
    } else if (
      trimmedEmail.length < 3 ||
      trimmedEmail.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      errs.email = 'Please enter a valid email format (e.g., name@company.com).';
    }

    if (!trimmedMessage) {
      errs.message = 'Please share a brief note about your project or editorial goals.';
    } else if (trimmedMessage.length < 15) {
      errs.message = 'Please provide a little more detail (at least 15 characters).';
    } else if (trimmedMessage.length > 3000) {
      errs.message = 'Project summary must be 3,000 characters or fewer.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [savedToDb, setSavedToDb] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});
    setIsSubmitting(true);
    try {
      await submitInquiry({
        name,
        email,
        projectType,
        message,
      });
      setSavedToDb(true);
      setSubmitted(true);
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : 'Unable to save inquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const gmailComposeUrl = buildGmailComposeUrl(
    `Project Inquiry: ${projectType} from ${name || 'Prospective Client'}`,
    `Hi Seapee,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nProject Overview:\n${message}\n`
  );

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6] relative" id="contact">
      <div className="max-w-[1080px] mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-xl border border-[#e4e2df] flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center max-w-2xl mx-auto gap-2">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
            Initiate Collaboration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-medium tracking-tight">
            Let's Create Content That Does More Than Fill a Page
          </h2>
          <p className="text-base text-[#55433c] mt-2 leading-relaxed">
            Have a content, SEO, research, or editorial project in mind? I'd love to understand your goal and create content that is useful to your audience and valuable to your business.
          </p>
        </div>

        {/* Action Button & Profile Block */}
        <div className="flex flex-col items-center justify-center gap-6">
          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center text-sm font-semibold bg-[#994524] hover:bg-[#7b2f0f] text-white transition-all px-8 py-4 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              Start a Conversation
              <span className="material-symbols-outlined ml-2 text-[20px]">send</span>
            </button>
          )}

          {/* Identity & Role */}
          <div className="text-center flex flex-col items-center">
            <span className="font-serif text-xl text-[#1b1c1a] font-medium">
              {SITE_CONFIG.NAME}
            </span>
            <span className="text-xs text-[#546252] mt-1 font-medium">
              Content Strategy • SEO • Research • Editorial
            </span>
          </div>

          {/* Links & Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={buildGmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors flex items-center gap-2 border border-[#e4e2df]"
              title={`Compose email in Gmail to ${SITE_CONFIG.EMAIL}`}
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]">mail</span>
              <span>{SITE_CONFIG.EMAIL}</span>
            </a>

            <a
              href={SITE_CONFIG.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors flex items-center gap-2 border border-[#e4e2df]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]">work</span>
              <span>LinkedIn Profile</span>
            </a>

            <button
              onClick={onOpenResume}
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors flex items-center gap-2 border border-[#e4e2df] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]">description</span>
              <span>Portfolio &amp; Resume</span>
            </button>

            <a
              href={SITE_CONFIG.TOPMATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors flex items-center gap-2 border border-[#e4e2df]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]">video_call</span>
              <span>Book on Topmate</span>
            </a>
          </div>
        </div>

        {/* Contact Form Container */}
        {showForm && !submitted && (
          <div className="pt-6 border-t border-[#efeeeb] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-[#1b1c1a] font-medium">
                  Send a Direct Message
                </h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs text-[#546252] hover:text-[#1b1c1a]"
                >
                  Hide form
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Your Name / Organization <span className="text-[#994524]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Maya Sharma, FinTech Labs"
                    className={`w-full px-4 py-2.5 text-sm bg-[#fbf9f6] border rounded-lg focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-[#e4e2df] focus:border-[#994524]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Your Email Address <span className="text-[#994524]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-2.5 text-sm bg-[#fbf9f6] border rounded-lg focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#e4e2df] focus:border-[#994524]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Project Type / Focus
                  </label>
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-[#fbf9f6] border border-[#e4e2df] rounded-lg focus:outline-none focus:border-[#994524] transition-colors"
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
                  <label htmlFor="message" className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Project Summary &amp; Goals <span className="text-[#994524]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    maxLength={3000}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Tell me a bit about your target audience, current content challenges, or timeline..."
                    className={`w-full px-4 py-2.5 text-sm bg-[#fbf9f6] border rounded-lg focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500' : 'border-[#e4e2df] focus:border-[#994524]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {errors.submit && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {errors.submit}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-[#546252]">
                    <span>
                      Saves your inquiry to the Client Workspace &amp; prepares your pre-filled Gmail message.
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#994524] hover:bg-[#7b2f0f] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success State */}
        {submitted && (
          <div className="pt-6 border-t border-[#efeeeb] animate-in fade-in duration-300">
            <div className="max-w-xl mx-auto bg-[#fbf9f6] border border-[#dbc1b8] rounded-xl p-6 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[#994524] text-4xl">
                check_circle
              </span>
              <h3 className="font-serif text-2xl text-[#1b1c1a] font-medium">
                Thank you, {name}!
              </h3>
              <p className="text-sm text-[#55433c] leading-relaxed max-w-md">
                {savedToDb
                  ? 'Your inquiry has been recorded in the workspace. Click below to open Gmail with your structured inquiry pre-filled for '
                  : 'Your message details are ready. Click the button below to open Gmail with your structured inquiry pre-filled for '}
                <strong className="text-[#1b1c1a]">{SITE_CONFIG.EMAIL}</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#994524] hover:bg-[#7b2f0f] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Open in Gmail</span>
                  <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                </a>
                {onOpenWorkspace && (
                  <button
                    type="button"
                    onClick={onOpenWorkspace}
                    className="px-4 py-2.5 text-xs text-[#1b1c1a] font-semibold hover:bg-[#efeeeb] border border-[#e4e2df] rounded-lg bg-white inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View in Client Workspace ({inquiries.length})</span>
                    <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSavedToDb(false);
                    setMessage('');
                  }}
                  className="px-4 py-2.5 text-xs text-[#546252] hover:text-[#1b1c1a] border border-[#e4e2df] rounded-lg bg-white cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
