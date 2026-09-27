import React, { useState, useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  ASK_SEAPEE_OPENING_MESSAGE,
  ASK_SEAPEE_SUGGESTED_QUESTIONS,
  buildGroundedFallbackReply,
  type AskSeapeeReply,
  type ChatActionLink,
} from '../services/askSeapeeKnowledge';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  sourceNote?: AskSeapeeReply['sourceNote'];
  actions?: ChatActionLink[];
  followUpSuggestions?: string[];
}

interface AskSeapeeChatbotProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

const SESSION_STORAGE_KEY = 'seapee_ask_ai_session_v1';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    role: 'assistant',
    content: ASK_SEAPEE_OPENING_MESSAGE,
    sourceNote: 'Portfolio Verified',
    actions: [
      { label: 'Explore Case Studies', href: '/case-studies', sectionId: 'case-studies' },
      { label: 'Book on Topmate', href: SITE_CONFIG.TOPMATE_URL, external: true },
      { label: 'Contact Seapee', href: '/contact', sectionId: 'contact' },
    ],
  },
];

function renderFormattedLine(line: string): React.ReactNode {
  const parts = line.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('***') && part.endsWith('***')) {
      return (
        <strong key={idx} className="font-semibold italic text-[#1b1c1a]">
          {part.slice(3, -3)}
        </strong>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#1b1c1a]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-[#1b1c1a]">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-[#efeeeb] text-[#994524] text-[12px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedMessageContent({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return null;

        if (line.startsWith('• ') || line.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="text-[#994524] font-bold mt-0.5 shrink-0">•</span>
              <span>{renderFormattedLine(line.slice(2))}</span>
            </div>
          );
        }

        if (line.startsWith('– ')) {
          return (
            <div key={index} className="flex items-start gap-2 pl-4 text-[13px]">
              <span className="text-[#546252] font-semibold shrink-0">–</span>
              <span>{renderFormattedLine(line.slice(2))}</span>
            </div>
          );
        }

        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="text-[#994524] font-semibold shrink-0">
                {numberedMatch[1]}.
              </span>
              <span>{renderFormattedLine(numberedMatch[2])}</span>
            </div>
          );
        }

        return <p key={index}>{renderFormattedLine(line)}</p>;
      })}
    </div>
  );
}

export const AskSeapeeChatbot: React.FC<AskSeapeeChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
    return INITIAL_MESSAGES;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore sessionStorage errors
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen, messages, isTyping]);

  const handleActionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    action: ChatActionLink
  ) => {
    if (action.external) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(action.href, action.sectionId);
    } else if (action.sectionId) {
      const el = document.getElementById(action.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  const sendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputValue('');
    setIsTyping(true);

    try {
      const historyPayload = updatedHistory.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let replyData: AskSeapeeReply | null = null;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: historyPayload,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.answer === 'string') {
            replyData = data as AskSeapeeReply;
          }
        }
      } catch {
        // Fallback to local grounded portfolio engine if network/serverless route is unavailable
      }

      if (!replyData) {
        await new Promise((resolve) => setTimeout(resolve, 260));
        replyData = buildGroundedFallbackReply(trimmed);
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyData.answer,
        sourceNote: replyData.sourceNote || 'Portfolio Verified',
        actions: replyData.actions,
        followUpSuggestions: replyData.followUpSuggestions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setShowAllSuggestions(false);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const visibleSuggestions = showAllSuggestions
    ? ASK_SEAPEE_SUGGESTED_QUESTIONS
    : ASK_SEAPEE_SUGGESTED_QUESTIONS.slice(0, 6);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <section
          aria-label="Ask Seapee AI Assistant"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[410px] max-h-[min(640px,calc(100vh-7rem))] bg-[#fbf9f6] border border-[#dbc1b8] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="bg-white px-4 py-3.5 border-b border-[#e4e2df] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#994524]/25 shrink-0 bg-[#b85d3a]">
                <img
                  src={SITE_CONFIG.AVATAR_IMAGE}
                  alt="Seapee Bajaj AI Assistant"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2e7d32] ring-2 ring-white"
                  title="AI Assistant Online"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg text-[#1b1c1a] font-medium leading-tight">
                    Ask Seapee
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#ffdbcf]/70 text-[#994524]">
                    AI Representative
                  </span>
                </div>
                <p className="text-xs text-[#546252] font-medium truncate">
                  Curious about my work? Ask my AI.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-xs text-[#546252] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
                title="Minimize Ask Seapee"
                aria-label="Close Ask Seapee chat"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Subtle AI Grounding Disclosure */}
          <div className="bg-[#f5f3f0] px-4 py-1.5 border-b border-[#e4e2df] flex items-center justify-between text-[11px] text-[#546252] shrink-0">
            <span>Trained on Seapee&apos;s verified portfolio &amp; case studies</span>
            <a
              href="/contact"
              onClick={(e) =>
                handleActionClick(e, {
                  label: 'Contact',
                  href: '/contact',
                  sectionId: 'contact',
                })
              }
              className="font-semibold text-[#994524] hover:underline"
            >
              Direct Contact →
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#994524] text-white rounded-br-xs shadow-2xs'
                      : 'bg-white text-[#55433c] border border-[#e4e2df] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-[13.5px] leading-relaxed">{msg.content}</p>
                  ) : (
                    <FormattedMessageContent content={msg.content} />
                  )}

                  {/* Action Links inside Assistant Message */}
                  {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#efeeeb] flex flex-wrap items-center gap-2">
                      {msg.actions.map((action) => (
                        <a
                          key={action.label}
                          href={action.href}
                          target={action.external ? '_blank' : undefined}
                          rel={action.external ? 'noopener noreferrer' : undefined}
                          onClick={(e) => handleActionClick(e, action)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fbf9f6] hover:bg-[#efeeeb] text-[#994524] border border-[#dbc1b8] text-xs font-semibold transition-colors"
                        >
                          <span>{action.label}</span>
                          <span className="material-symbols-outlined text-[13px]">
                            {action.external ? 'open_in_new' : 'arrow_forward'}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Source Badge */}
                {msg.role === 'assistant' && msg.sourceNote && (
                  <span className="mt-1 px-1 text-[10px] text-[#546252] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#994524]">
                      verified
                    </span>
                    <span>{msg.sourceNote}</span>
                  </span>
                )}

                {/* Contextual Follow-Up Chips */}
                {msg.role === 'assistant' &&
                  msg.followUpSuggestions &&
                  msg.followUpSuggestions.length > 0 &&
                  msg.id === messages[messages.length - 1]?.id && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.followUpSuggestions.map((followUp) => (
                        <button
                          key={followUp}
                          type="button"
                          onClick={() => sendMessage(followUp)}
                          className="text-left text-xs px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] hover:border-[#dbc1b8] transition-colors cursor-pointer"
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-[#e4e2df] rounded-2xl rounded-bl-xs px-4 py-2.5 text-xs text-[#546252] flex items-center gap-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#994524] animate-pulse" />
                  <span>Seapee&apos;s AI is thinking...</span>
                </div>
              </div>
            )}

            {/* Initial Suggested FAQ Questions */}
            {messages.length <= 2 && (
              <div className="pt-2 border-t border-[#e4e2df]/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#546252]">
                    Suggested Questions
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAllSuggestions((prev) => !prev)}
                    className="text-[11px] font-semibold text-[#994524] hover:underline cursor-pointer"
                  >
                    {showAllSuggestions ? 'Show fewer' : 'View all 12'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {visibleSuggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      className="text-left text-xs px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] hover:border-[#994524]/50 transition-all cursor-pointer shadow-2xs"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-[#e4e2df] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about SEO, B2B, IMARC, projects, or hiring..."
              aria-label="Ask Seapee a question"
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#fbf9f6] border border-[#e4e2df] rounded-xl focus:outline-none focus:border-[#994524] text-[#1b1c1a] placeholder:text-[#88726b]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send question"
              className="px-3.5 py-2.5 rounded-xl bg-[#994524] hover:bg-[#7b2f0f] disabled:opacity-45 text-white text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </section>
      )}

      {/* Floating Trigger Button: "Ask Seapee" */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Ask Seapee — Curious about my work? Ask my AI."
        title="Curious about my work? Ask my AI."
        className="group flex items-center gap-2.5 bg-[#1b1c1a] hover:bg-[#994524] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl border border-[#dbc1b8]/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <span className="w-7 h-7 rounded-full bg-[#994524] group-hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors">
          <span className="material-symbols-outlined text-[16px]">
            {isOpen ? 'close' : 'auto_awesome'}
          </span>
        </span>
        <span className="flex flex-col items-start text-left leading-none pr-0.5">
          <span className="text-xs sm:text-[13px] font-semibold tracking-wide">
            Ask Seapee
          </span>
          <span className="text-[10px] text-[#dbc1b8] group-hover:text-white/90 font-normal mt-0.5 hidden sm:inline">
            Curious about my work? Ask my AI.
          </span>
        </span>
      </button>
    </div>
  );
};
