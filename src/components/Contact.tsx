import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface ContactProps {
  initialService?: string;
  onOpenResume: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService, onOpenResume }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'SEO Content Strategy');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!name.trim()) {
      errs.name = 'Please provide your name or organization.';
    }
    if (!email.trim()) {
      errs.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email format (e.g., name@company.com).';
    }
    if (!message.trim()) {
      errs.message = 'Please share a brief note about your project or editorial goals.';
    } else if (message.trim().length < 15) {
      errs.message = 'Please provide a little more detail (at least 15 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Client-side validation passed.
    // Ready for Formspree, EmailJS, or Resend webhook integration.
    setSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
      window.location.href = `mailto:${SITE_CONFIG.EMAIL}`;
    }
  };

  const mailtoFallback = `mailto:${SITE_CONFIG.EMAIL}?subject=${encodeURIComponent(
    `Project Inquiry: ${projectType} from ${name || 'Prospective Client'}`
  )}&body=${encodeURIComponent(
    `Hi Seapee,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nProject Overview:\n${message}\n`
  )}`;

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
              href={`mailto:${SITE_CONFIG.EMAIL}`}
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors flex items-center gap-2 border border-[#e4e2df]"
              title={`Send email to ${SITE_CONFIG.EMAIL}`}
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-[#546252]">
                    Form validated locally. Pre-configured for direct delivery.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#994524] hover:bg-[#7b2f0f] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    Submit Inquiry
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
                Your message details have been validated. Because this portfolio is deployed client-side, click the button below to send your structured inquiry directly via your email client to{' '}
                <strong className="text-[#1b1c1a]">{SITE_CONFIG.EMAIL}</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={mailtoFallback}
                  className="px-6 py-2.5 bg-[#994524] hover:bg-[#7b2f0f] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Open in Email Client</span>
                  <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2.5 text-xs text-[#546252] hover:text-[#1b1c1a] border border-[#e4e2df] rounded-lg bg-white"
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
