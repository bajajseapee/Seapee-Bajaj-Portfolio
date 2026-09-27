import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  ASK_SEAPEE_SUGGESTED_QUESTIONS,
  TALK_TO_SEAPEE_OPENING_MESSAGE,
  buildGroundedFallbackReply,
  stripMarkdownForSpeech,
  type AskSeapeeReply,
  type ChatActionLink,
  type ConversationTurn,
} from '../services/askSeapeeKnowledge';

export type VoiceAgentState =
  | 'Ready'
  | 'Listening...'
  | 'Thinking...'
  | 'Speaking...'
  | 'Muted'
  | 'Session ended';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  spokenText?: string;
  sourceNote?: AskSeapeeReply['sourceNote'];
  actions?: ChatActionLink[];
  followUpSuggestions?: string[];
}

interface AskSeapeeChatbotProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

const SESSION_STORAGE_KEY = 'seapee_ask_me_anything_ai_v3';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    role: 'assistant',
    content: TALK_TO_SEAPEE_OPENING_MESSAGE,
    spokenText: TALK_TO_SEAPEE_OPENING_MESSAGE,
    sourceNote: 'Portfolio Verified',
    actions: [
      { label: 'View Portfolio', href: '/work', sectionId: 'selected-work' },
      { label: 'Work With Seapee', href: '/contact', sectionId: 'contact' },
      { label: 'Book a Conversation', href: SITE_CONFIG.TOPMATE_URL, external: true },
    ],
  },
];

function MicSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function MicOffSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function VolumeSvg({ muted, className = 'w-4 h-4' }: { muted?: boolean; className?: string }) {
  if (muted) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="22" x2="16" y1="9" y2="15" />
        <line x1="16" x2="22" y1="9" y2="15" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function AiChatSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 7v4" />
      <path d="M10 9h4" />
    </svg>
  );
}

function selectWarmFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const englishVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  const pool = englishVoices.length > 0 ? englishVoices : voices;

  const preferredKeywords = [
    'natural',
    'samantha',
    'aria',
    'jenny',
    'sonia',
    'neerja',
    'karen',
    'moira',
    'tessa',
    'victoria',
    'zira',
    'google uk english female',
    'google us english',
    'female',
  ];

  for (const keyword of preferredKeywords) {
    const match = pool.find((v) => v.name.toLowerCase().includes(keyword));
    if (match) return match;
  }

  return pool[0] || null;
}

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
    <div className="space-y-1.5 text-[13px] leading-relaxed">
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

        return <p key={index}>{renderFormattedLine(line)}</p>;
      })}
    </div>
  );
}

export const AskSeapeeChatbot: React.FC<AskSeapeeChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentState, setAgentState] = useState<VoiceAgentState>('Ready');
  const [handsFreeActive, setHandsFreeActive] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micPermissionNote, setMicPermissionNote] = useState<string | null>(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
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
      // Ignore storage errors
    }
    return INITIAL_MESSAGES;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const handsFreeRef = useRef<boolean>(false);
  const agentStateRef = useRef<VoiceAgentState>('Ready');
  const voiceOutputRef = useRef<boolean>(true);
  const sendMessageRef = useRef<(text: string, fromVoice?: boolean) => Promise<void>>(async () => {});

  useEffect(() => {
    handsFreeRef.current = handsFreeActive;
  }, [handsFreeActive]);

  useEffect(() => {
    agentStateRef.current = agentState;
  }, [agentState]);

  useEffect(() => {
    voiceOutputRef.current = voiceOutputEnabled;
  }, [voiceOutputEnabled]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, interimTranscript, agentState]);

  // Preload synthesis voices on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener?.('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener?.('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  const stopSpeechOutput = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
      recognitionRef.current = null;
    }
    setInterimTranscript('');
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    stopSpeechOutput();
    setMicPermissionNote(null);

    const SpeechRecognitionApi =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionApi) {
      setMicPermissionNote(
        'Voice recognition is not supported in this browser. You can still type or tap any question below, and I will speak the answer aloud.'
      );
      setAgentState('Ready');
      inputRef.current?.focus();
      return;
    }

    stopRecognition();

    try {
      const recognition = new SpeechRecognitionApi();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let finalCaptured = '';

      recognition.onstart = () => {
        setInterimTranscript('');
        setAgentState('Listening...');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            finalText += transcriptChunk;
          } else {
            interim += transcriptChunk;
          }
        }

        if (finalText.trim()) {
          finalCaptured = finalText.trim();
          setInterimTranscript(finalCaptured);
        } else {
          setInterimTranscript(interim.trim());
        }
      };

      recognition.onerror = (event: any) => {
        const errorCode = event?.error;
        if (errorCode === 'not-allowed' || errorCode === 'service-not-allowed') {
          setHandsFreeActive(false);
          handsFreeRef.current = false;
          setMicPermissionNote(
            'Microphone access was blocked. Please allow microphone permissions in your browser address bar, or ask your question using text below.'
          );
          setAgentState('Muted');
        } else if (errorCode === 'no-speech') {
          if (handsFreeRef.current && agentStateRef.current !== 'Muted' && agentStateRef.current !== 'Session ended') {
            setAgentState('Ready');
          }
        } else if (errorCode !== 'aborted') {
          setAgentState('Ready');
        }
      };

      recognition.onend = () => {
        const spokenQuestion = finalCaptured.trim();
        setInterimTranscript('');
        if (spokenQuestion) {
          sendMessageRef.current(spokenQuestion, true);
        } else if (
          agentStateRef.current !== 'Thinking...' &&
          agentStateRef.current !== 'Speaking...' &&
          agentStateRef.current !== 'Muted' &&
          agentStateRef.current !== 'Session ended'
        ) {
          setAgentState('Ready');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setMicPermissionNote(
        'Could not start microphone capture. You can type or tap any question below.'
      );
      setAgentState('Ready');
    }
  }, [stopRecognition, stopSpeechOutput]);

  const speakText = useCallback(
    (textToSpeak: string, autoListenAfter: boolean) => {
      if (
        !voiceOutputRef.current ||
        typeof window === 'undefined' ||
        !('speechSynthesis' in window)
      ) {
        if (autoListenAfter && handsFreeRef.current && agentStateRef.current !== 'Muted') {
          startListening();
        } else if (agentStateRef.current !== 'Muted' && agentStateRef.current !== 'Session ended') {
          setAgentState('Ready');
        }
        return;
      }

      stopRecognition();
      window.speechSynthesis.cancel();

      const cleaned = stripMarkdownForSpeech(textToSpeak);
      if (!cleaned) {
        setAgentState('Ready');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const voices = window.speechSynthesis.getVoices();
      const chosenVoice = selectWarmFemaleVoice(voices);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      utterance.rate = 1.02;
      utterance.pitch = 1.03;

      utterance.onstart = () => {
        setAgentState('Speaking...');
      };

      utterance.onend = () => {
        if (
          autoListenAfter &&
          handsFreeRef.current &&
          agentStateRef.current !== 'Muted' &&
          agentStateRef.current !== 'Session ended'
        ) {
          setTimeout(() => {
            if (
              handsFreeRef.current &&
              agentStateRef.current !== 'Muted' &&
              agentStateRef.current !== 'Session ended'
            ) {
              startListening();
            }
          }, 220);
        } else if (agentStateRef.current !== 'Muted' && agentStateRef.current !== 'Session ended') {
          setAgentState('Ready');
        }
      };

      utterance.onerror = () => {
        if (agentStateRef.current !== 'Muted' && agentStateRef.current !== 'Session ended') {
          setAgentState('Ready');
        }
      };

      setAgentState('Speaking...');
      window.speechSynthesis.speak(utterance);
    },
    [startListening, stopRecognition]
  );

  const sendMessage = useCallback(
    async (questionText: string, fromVoice = false) => {
      const trimmed = questionText.trim();
      if (!trimmed || agentStateRef.current === 'Thinking...') return;

      stopRecognition();
      stopSpeechOutput();

      if (fromVoice) {
        setHandsFreeActive(true);
        handsFreeRef.current = true;
      }

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
      };

      const updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);
      setInputValue('');
      setAgentState('Thinking...');

      try {
        const historyPayload: ConversationTurn[] = updatedHistory.slice(-8).map((m) => ({
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
          // Use local grounded portfolio engine if network/serverless route is unavailable
        }

        if (!replyData) {
          await new Promise((resolve) => setTimeout(resolve, 220));
          replyData = buildGroundedFallbackReply(trimmed, historyPayload.slice(0, -1));
        }

        const spoken = replyData.spokenText || stripMarkdownForSpeech(replyData.answer);

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: replyData.answer,
          spokenText: spoken,
          sourceNote: replyData.sourceNote || 'Portfolio Verified',
          actions: replyData.actions,
          followUpSuggestions: replyData.followUpSuggestions,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Speak response aloud if voice output is enabled
        if (voiceOutputRef.current && agentStateRef.current !== 'Session ended') {
          speakText(spoken, fromVoice || handsFreeRef.current);
        } else {
          setAgentState(agentStateRef.current === 'Muted' ? 'Muted' : 'Ready');
        }
      } catch {
        setAgentState('Ready');
      }
    },
    [messages, speakText, stopRecognition, stopSpeechOutput]
  );

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecognition();
      stopSpeechOutput();
    };
  }, [stopRecognition, stopSpeechOutput]);

  const handlePrimaryOrbAction = () => {
    if (agentState === 'Session ended') {
      setAgentState('Ready');
      setHandsFreeActive(true);
      handsFreeRef.current = true;
      startListening();
      return;
    }

    // If currently speaking, interrupt immediately and listen (barge-in)
    if (agentState === 'Speaking...') {
      stopSpeechOutput();
      setHandsFreeActive(true);
      handsFreeRef.current = true;
      startListening();
      return;
    }

    // If currently listening, stop listening
    if (agentState === 'Listening...') {
      stopRecognition();
      setAgentState('Ready');
      return;
    }

    // Otherwise (Ready or Muted), activate hands-free voice conversation and start listening
    setHandsFreeActive(true);
    handsFreeRef.current = true;
    startListening();
  };

  const handleToggleMuteMic = () => {
    if (agentState === 'Muted') {
      setHandsFreeActive(true);
      handsFreeRef.current = true;
      startListening();
    } else {
      stopRecognition();
      setHandsFreeActive(false);
      handsFreeRef.current = false;
      if (agentState === 'Listening...') {
        setAgentState('Muted');
      } else {
        setAgentState('Muted');
      }
    }
  };

  const handleEndConversation = () => {
    stopRecognition();
    stopSpeechOutput();
    setHandsFreeActive(false);
    handsFreeRef.current = false;
    setAgentState('Session ended');
  };

  const handleStartNewConversation = () => {
    stopRecognition();
    stopSpeechOutput();
    setMessages(INITIAL_MESSAGES);
    setShowAllSuggestions(false);
    setMicPermissionNote(null);
    setAgentState('Ready');
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    if (voiceOutputEnabled) {
      speakText(TALK_TO_SEAPEE_OPENING_MESSAGE, true);
    }
  };

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue, false);
  };

  const handleToggleOpen = () => {
    if (isOpen) {
      stopRecognition();
      stopSpeechOutput();
      setHandsFreeActive(false);
      handsFreeRef.current = false;
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setAgentState('Ready');
    }
  };

  const visibleSuggestions = showAllSuggestions
    ? ASK_SEAPEE_SUGGESTED_QUESTIONS
    : ASK_SEAPEE_SUGGESTED_QUESTIONS.slice(0, 5);

  const stateBadgeStyle: Record<VoiceAgentState, string> = {
    Ready: 'bg-[#efeeeb] text-[#546252] border-[#dbc1b8]',
    'Listening...': 'bg-[#ffdbcf] text-[#994524] border-[#994524]/40',
    'Thinking...': 'bg-[#fef3c7] text-[#92400e] border-[#f59e0b]/40',
    'Speaking...': 'bg-[#dcfce7] text-[#166534] border-[#22c55e]/40',
    Muted: 'bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]',
    'Session ended': 'bg-[#f5f3f0] text-[#55433c] border-[#dbc1b8]',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Voice Conversation Panel */}
      {isOpen && (
        <section
          aria-label="Ask Me Anything — Seapee's AI Assistant"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[430px] max-h-[min(700px,calc(100vh-6.5rem))] bg-[#fbf9f6] border border-[#dbc1b8] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Top Header */}
          <div className="bg-white px-4 py-3.5 border-b border-[#e4e2df] flex items-start justify-between gap-3 shrink-0">
            <div className="flex items-start gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#994524]/25 shrink-0 bg-[#b85d3a] mt-0.5">
                <img
                  src={SITE_CONFIG.AVATAR_IMAGE}
                  alt="Seapee's AI Assistant"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                    agentState === 'Session ended' ? 'bg-[#88726b]' : 'bg-[#2e7d32]'
                  }`}
                  title={`Status: ${agentState}`}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-sm sm:text-base text-[#1b1c1a] font-bold tracking-wider uppercase">
                    ASK ME ANYTHING
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#ffdbcf]/70 text-[#994524]">
                    AI Assistant
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stateBadgeStyle[agentState]}`}
                  >
                    {agentState}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#55433c] leading-snug mt-1">
                  Hi! I&apos;m Seapee&apos;s AI assistant. Ask me anything about her work, experience, skills, projects, or how you can work with her.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const next = !voiceOutputEnabled;
                  setVoiceOutputEnabled(next);
                  voiceOutputRef.current = next;
                  if (!next) {
                    stopSpeechOutput();
                    if (agentState === 'Speaking...') {
                      setAgentState('Ready');
                    }
                  }
                }}
                className="p-1.5 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
                title={voiceOutputEnabled ? 'Mute AI voice output' : 'Unmute AI voice output'}
                aria-label={voiceOutputEnabled ? 'Mute AI voice output' : 'Unmute AI voice output'}
              >
                <VolumeSvg muted={!voiceOutputEnabled} className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToggleOpen}
                className="p-1.5 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
                title="Minimize Ask Me Anything"
                aria-label="Close Ask Me Anything"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Interactive Voice Orb Stage */}
          <div className="bg-gradient-to-b from-white via-[#fbf9f6] to-[#f5f3f0] px-4 py-4 border-b border-[#e4e2df] flex flex-col items-center text-center shrink-0">
            {agentState === 'Session ended' ? (
              <div className="py-2 space-y-3 w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeeb] text-[#55433c] text-xs font-medium">
                  <span>Conversation ended</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1b1c1a] font-medium max-w-xs mx-auto">
                  Thanks for chatting with Seapee&apos;s AI. Want to explore her work or get in touch?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <a
                    href="/work"
                    onClick={(e) =>
                      handleActionClick(e, {
                        label: 'View Portfolio',
                        href: '/work',
                        sectionId: 'selected-work',
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#dbc1b8] text-xs font-semibold transition-colors"
                  >
                    View Portfolio
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) =>
                      handleActionClick(e, {
                        label: 'Work With Seapee',
                        href: '/contact',
                        sectionId: 'contact',
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs font-semibold transition-colors"
                  >
                    Work With Seapee
                  </a>
                  <a
                    href={SITE_CONFIG.TOPMATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#efeeeb] text-[#994524] border border-[#dbc1b8] text-xs font-semibold transition-colors"
                  >
                    Book a Conversation ↗
                  </a>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleStartNewConversation}
                    className="text-xs font-semibold text-[#546252] hover:text-[#1b1c1a] underline cursor-pointer"
                  >
                    Start a new AI conversation
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Central Animated Voice Orb */}
                <div className="relative flex items-center justify-center my-1">
                  {/* Outer pulsing aura when Listening or Speaking */}
                  {agentState === 'Listening...' && (
                    <>
                      <span className="absolute w-24 h-24 rounded-full bg-[#994524]/20 animate-ping" />
                      <span className="absolute w-20 h-20 rounded-full bg-[#994524]/30 animate-pulse" />
                    </>
                  )}
                  {agentState === 'Speaking...' && (
                    <>
                      <span className="absolute w-24 h-24 rounded-full bg-[#546252]/20 animate-pulse" />
                      <span className="absolute w-20 h-20 rounded-full bg-[#994524]/25 animate-ping" />
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handlePrimaryOrbAction}
                    aria-label={
                      agentState === 'Listening...'
                        ? 'Stop listening'
                        : agentState === 'Speaking...'
                        ? 'Interrupt AI and speak now'
                        : 'Tap to speak with Seapee AI'
                    }
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                      agentState === 'Listening...'
                        ? 'bg-[#994524] text-white scale-105 ring-4 ring-[#ffdbcf]'
                        : agentState === 'Speaking...'
                        ? 'bg-[#546252] text-white scale-105 ring-4 ring-[#dcfce7]'
                        : agentState === 'Thinking...'
                        ? 'bg-[#1b1c1a] text-white opacity-90'
                        : agentState === 'Muted'
                        ? 'bg-[#e4e2df] text-[#55433c]'
                        : 'bg-[#1b1c1a] hover:bg-[#994524] text-white hover:scale-105'
                    }`}
                  >
                    {agentState === 'Muted' ? (
                      <MicOffSvg className="w-6 h-6" />
                    ) : agentState === 'Speaking...' ? (
                      /* Animated Equalizer Bars while AI is speaking */
                      <div className="flex items-end gap-1 h-5" aria-hidden="true">
                        <span className="w-1 bg-white rounded-full h-3 animate-bounce" />
                        <span className="w-1 bg-white rounded-full h-5 animate-pulse" />
                        <span className="w-1 bg-white rounded-full h-4 animate-bounce" />
                        <span className="w-1 bg-white rounded-full h-2.5 animate-pulse" />
                      </div>
                    ) : agentState === 'Thinking...' ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <MicSvg className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Live Voice Status & Action Controls */}
                <p className="text-xs font-medium text-[#1b1c1a] mt-2">
                  {agentState === 'Listening...'
                    ? interimTranscript
                      ? `"${interimTranscript}"`
                      : 'Listening... speak naturally now'
                    : agentState === 'Speaking...'
                    ? 'Seapee’s AI is speaking — tap orb to interrupt & ask follow-up'
                    : agentState === 'Thinking...'
                    ? 'Thinking...'
                    : agentState === 'Muted'
                    ? 'Microphone muted — tap orb or Unmute to speak'
                    : 'Tap the microphone orb to talk, or pick a topic below'}
                </p>

                {micPermissionNote && (
                  <p className="text-[11px] text-[#994524] bg-[#ffdbcf]/40 border border-[#dbc1b8] rounded-lg px-2.5 py-1.5 mt-2 max-w-xs">
                    {micPermissionNote}
                  </p>
                )}

                {/* Voice Control Bar: Hear Intro / Mute / Interrupt / End Call */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
                  {agentState === 'Speaking...' ? (
                    <button
                      type="button"
                      onClick={handlePrimaryOrbAction}
                      className="px-2.5 py-1 rounded-full bg-[#ffdbcf] hover:bg-[#994524] text-[#994524] hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Interrupt &amp; Speak
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => speakText(TALK_TO_SEAPEE_OPENING_MESSAGE, true)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#efeeeb] text-[#55433c] border border-[#e4e2df] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      Play Voice Greeting
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleToggleMuteMic}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                      agentState === 'Muted'
                        ? 'bg-[#994524] text-white border-[#994524]'
                        : 'bg-white hover:bg-[#efeeeb] text-[#55433c] border-[#e4e2df]'
                    }`}
                  >
                    {agentState === 'Muted' ? 'Unmute Mic' : 'Mute Mic'}
                  </button>

                  {(handsFreeActive ||
                    agentState === 'Listening...' ||
                    agentState === 'Speaking...' ||
                    messages.length > 1) && (
                    <button
                      type="button"
                      onClick={handleEndConversation}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      End conversation
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Live Transcript & Suggested Questions Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#546252] mb-1 px-1">
                  {msg.role === 'user' ? 'You' : "Seapee's AI Assistant"}
                </span>
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-[#994524] text-white rounded-br-xs shadow-2xs'
                      : 'bg-white text-[#55433c] border border-[#e4e2df] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="text-[13px] leading-relaxed">{msg.content}</p>
                  ) : (
                    <FormattedMessageContent content={msg.content} />
                  )}

                  {/* Action Links inside Assistant Message */}
                  {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#efeeeb] flex flex-wrap items-center gap-1.5">
                      {msg.actions.map((action) => {
                        const isPrimaryContactCta =
                          action.label === 'Contact Seapee' &&
                          msg.sourceNote === 'Direct Inquiry Recommended';
                        return (
                          <a
                            key={action.label}
                            href={action.href}
                            target={action.external ? '_blank' : undefined}
                            rel={action.external ? 'noopener noreferrer' : undefined}
                            onClick={(e) => handleActionClick(e, action)}
                            className={
                              isPrimaryContactCta
                                ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-[11.5px] font-semibold transition-colors shadow-2xs'
                                : 'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fbf9f6] hover:bg-[#efeeeb] text-[#994524] border border-[#dbc1b8] text-[11px] font-semibold transition-colors'
                            }
                          >
                            <span>{action.label}</span>
                            <span className="material-symbols-outlined text-[12px]">
                              {action.external ? 'open_in_new' : 'arrow_forward'}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Source Badge + Replay Voice Button */}
                {msg.role === 'assistant' && (
                  <div className="mt-1 px-1 flex items-center gap-3 text-[10px] text-[#546252]">
                    {msg.sourceNote && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-[#994524]">
                          verified
                        </span>
                        <span>{msg.sourceNote}</span>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceOutputEnabled(true);
                        voiceOutputRef.current = true;
                        speakText(msg.spokenText || msg.content, false);
                      }}
                      className="text-[#994524] hover:underline font-medium cursor-pointer"
                    >
                      Speak aloud
                    </button>
                  </div>
                )}

                {/* Contextual Follow-Up Chips */}
                {msg.role === 'assistant' &&
                  msg.followUpSuggestions &&
                  msg.followUpSuggestions.length > 0 &&
                  msg.id === messages[messages.length - 1]?.id &&
                  agentState !== 'Session ended' && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.followUpSuggestions.map((followUp) => (
                        <button
                          key={followUp}
                          type="button"
                          onClick={() => sendMessage(followUp, false)}
                          className="text-left text-xs px-2.5 py-1 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] hover:border-[#dbc1b8] transition-colors cursor-pointer"
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Suggested Starter Questions */}
            {messages.length <= 2 && agentState !== 'Session ended' && (
              <div className="pt-2 border-t border-[#e4e2df]/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#546252]">
                    Suggested Questions (Speak or Tap)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAllSuggestions((prev) => !prev)}
                    className="text-[11px] font-semibold text-[#994524] hover:underline cursor-pointer"
                  >
                    {showAllSuggestions ? 'Show fewer' : 'View all 11'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {visibleSuggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question, false)}
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

          {/* Text Input Fallback Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-2.5 bg-white border-t border-[#e4e2df] flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={handlePrimaryOrbAction}
              aria-label={agentState === 'Listening...' ? 'Stop voice input' : 'Start voice input'}
              title={agentState === 'Listening...' ? 'Stop voice input' : 'Speak your question'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                agentState === 'Listening...'
                  ? 'bg-[#994524] text-white border-[#994524]'
                  : 'bg-[#fbf9f6] hover:bg-[#efeeeb] text-[#994524] border-[#dbc1b8]'
              }`}
            >
              <MicSvg className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Prefer typing? Ask here."
              aria-label="Prefer typing? Ask here."
              className="flex-1 px-3 py-2 text-xs sm:text-[13px] bg-[#fbf9f6] border border-[#e4e2df] rounded-xl focus:outline-none focus:border-[#994524] text-[#1b1c1a] placeholder:text-[#88726b]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || agentState === 'Thinking...'}
              aria-label="Send question"
              className="px-3 py-2 rounded-xl bg-[#994524] hover:bg-[#7b2f0f] disabled:opacity-45 text-white text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[17px]">send</span>
            </button>
          </form>
        </section>
      )}

      {/* Floating Primary AI Button: "Ask Me Anything" */}
      <button
        type="button"
        onClick={handleToggleOpen}
        aria-expanded={isOpen}
        aria-label="Ask Me Anything — Interactive AI Assistant for Seapee Bajaj"
        title="Ask Me Anything — Seapee's AI Assistant (Voice & Chat)"
        className="group flex items-center gap-2.5 bg-[#1b1c1a] hover:bg-[#994524] text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl hover:shadow-2xl border border-[#dbc1b8]/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <span className="relative w-8 h-8 rounded-full bg-[#994524] group-hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors">
          {isOpen ? (
            <span className="material-symbols-outlined text-[17px]">close</span>
          ) : (
            <AiChatSvg className="w-4 h-4" />
          )}
        </span>
        <span className="flex flex-col items-start text-left leading-none pr-0.5">
          <span className="text-xs sm:text-[13px] font-semibold tracking-wide flex items-center gap-1.5">
            <span>Ask Me Anything</span>
            <MicSvg className="w-3.5 h-3.5 text-[#ffdbcf] group-hover:text-white transition-colors" />
          </span>
          <span className="text-[10px] text-[#dbc1b8] group-hover:text-white/90 font-normal mt-0.5 hidden sm:inline">
            Seapee&apos;s AI Assistant • Voice &amp; Chat
          </span>
        </span>
      </button>
    </div>
  );
};
