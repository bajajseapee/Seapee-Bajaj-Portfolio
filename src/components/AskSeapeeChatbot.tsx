import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import aiAssistantIllustration from '../assets/images/seapee_ai_assistant_avatar_1790582552233.jpg';
import aiAssistantIllustrationWebp from '../assets/images/seapee_ai_assistant_avatar_1790582552233.webp';
import {
  ASK_SEAPEE_SUGGESTED_QUESTIONS,
  TALK_TO_SEAPEE_OPENING_MESSAGE,
  buildGroundedFallbackReply,
  stripMarkdownForSpeech,
  type AskSeapeeReply,
  type ChatActionLink,
  type ConversationTurn,
} from '../services/askSeapeeKnowledge';
import { triggerResumePrint } from './ResumeSection';

export type InteractionMode = 'chat' | 'voice';

export type VoiceAgentState =
  | 'Ready'
  | 'Listening...'
  | 'Thinking...'
  | 'Speaking...'
  | 'Muted';

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
  onOpenResumeModal?: () => void;
}

const SESSION_STORAGE_KEY = 'seapee_ai_assistant_session_v5';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    role: 'assistant',
    content: TALK_TO_SEAPEE_OPENING_MESSAGE,
    spokenText: TALK_TO_SEAPEE_OPENING_MESSAGE,
    sourceNote: 'Portfolio Verified',
    actions: [
      { label: "View Seapee's Resume", href: '#resume', sectionId: 'resume' },
      { label: 'View Portfolio', href: '/work', sectionId: 'selected-work' },
      { label: 'Contact Seapee', href: '/contact', sectionId: 'contact' },
    ],
  },
];

function MicSvg({ className = 'w-4 h-4' }: { className?: string }) {
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

function MicOffSvg({ className = 'w-4 h-4' }: { className?: string }) {
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

function HeadsetAvatarFallbackSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="2.5" y="12" width="3.5" height="6" rx="1.5" />
      <rect x="18" y="12" width="3.5" height="6" rx="1.5" />
      <path d="M19.5 18v1a2.5 2.5 0 0 1-2.5 2.5h-4" />
      <circle cx="12" cy="21.5" r="1" fill="currentColor" />
      <circle cx="12" cy="11.5" r="3.2" />
      <path d="M7.8 18.2a5 5 0 0 1 8.4 0" />
    </svg>
  );
}

export type VisemeShape = 'rest' | 'closed' | 'slight' | 'open' | 'wide' | 'round';

function computeVisemeFromSyllable(token: string, step: number): VisemeShape {
  const clean = token.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) {
    return step % 2 === 0 ? 'slight' : 'closed';
  }
  const char = clean[step % clean.length];
  if ('mbp'.includes(char)) return 'closed';
  if ('ouqw'.includes(char)) return 'round';
  if ('aei'.includes(char)) return step % 2 === 0 ? 'open' : 'wide';
  if ('y'.includes(char)) return 'wide';
  return step % 3 === 0 ? 'closed' : 'slight';
}

function AiAssistantAvatar({
  sizeClass = 'w-11 h-11',
  isSpeaking = false,
  viseme = 'rest',
}: {
  sizeClass?: string;
  isSpeaking?: boolean;
  viseme?: VisemeShape;
}) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const sources = [
    { jpg: aiAssistantIllustration, webp: aiAssistantIllustrationWebp },
    { jpg: SITE_CONFIG.AI_ASSISTANT_AVATAR, webp: '/seapee-ai-assistant-avatar.webp' },
  ];
  const currentSource = sources[srcIndex];

  // Natural periodic eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative ${sizeClass} rounded-full overflow-hidden ring-2 ${
        isSpeaking ? 'ring-[#994524] shadow-md' : 'ring-[#994524]/25 shadow-2xs'
      } shrink-0 bg-[#f5efe8] flex items-center justify-center transition-all duration-150`}
    >
      {currentSource ? (
        <div
          className={`relative w-full h-full rounded-full overflow-hidden transition-transform duration-150 ${
            isSpeaking && viseme === 'open'
              ? 'scale-[1.015] -translate-y-[0.5px]'
              : isSpeaking && viseme === 'round'
              ? 'scale-[1.01]'
              : 'scale-100'
          }`}
        >
          <picture className="w-full h-full block">
            <source srcSet={currentSource.webp} sizes="44px" type="image/webp" />
            <img
              src={currentSource.jpg}
              sizes="44px"
              alt="Seapee's AI Assistant — Illustrated Avatar"
              width={88}
              height={88}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setSrcIndex((prev) => prev + 1)}
              className="w-full h-full rounded-full object-cover object-center block select-none"
            />
          </picture>

          {/* Natural Eyelid Blink Overlay aligned to eye coordinates (y=36.5%..39.5%) */}
          {isBlinking && (
            <>
              <span
                aria-hidden="true"
                className="absolute rounded-full bg-[#e49670]"
                style={{ left: '40.5%', top: '36.2%', width: '6.8%', height: '3.2%' }}
              />
              <span
                aria-hidden="true"
                className="absolute rounded-full bg-[#e49670]"
                style={{ left: '53.2%', top: '36.2%', width: '6.8%', height: '3.2%' }}
              />
            </>
          )}

          {/* Synchronized Lip-Sync Viseme Overlay aligned to mouth coordinates (x=43.2%..56.6%, y=48.6%..54.8%) */}
          {isSpeaking && viseme !== 'rest' && (
            <svg
              viewBox="0 0 100 54"
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                left: '43.0%',
                top: '48.4%',
                width: '13.8%',
                height: '6.6%',
              }}
            >
              {/* Soft skin-matched base covering static smile during articulation */}
              <ellipse cx="50" cy="27" rx="48" ry="25" fill="#EEA37B" />
              <ellipse cx="50" cy="29" rx="44" ry="21" fill="#F2AA82" />

              {viseme === 'closed' && (
                <g>
                  {/* Pressed lips for M / B / P */}
                  <path
                    d="M 14 26 Q 32 22, 50 25 Q 68 22, 86 26 Q 50 31, 14 26 Z"
                    fill="#C25949"
                  />
                  <path
                    d="M 16 26 Q 50 34, 84 26 Q 50 30, 16 26 Z"
                    fill="#DF6D55"
                  />
                  <path
                    d="M 15 26 Q 50 28, 85 26"
                    stroke="#6C2620"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {viseme === 'slight' && (
                <g>
                  {/* Partially open natural articulation */}
                  <path
                    d="M 12 24 Q 50 18, 88 24 Q 76 38, 50 39 Q 24 38, 12 24 Z"
                    fill="#3B1514"
                  />
                  {/* Upper teeth */}
                  <path
                    d="M 22 24 Q 50 21, 78 24 L 75 29 Q 50 30, 25 29 Z"
                    fill="#F4F6F1"
                  />
                  {/* Upper & lower lip contour */}
                  <path
                    d="M 10 24 Q 32 17, 50 20 Q 68 17, 90 24 Q 50 21, 10 24 Z"
                    fill="#C25949"
                  />
                  <path
                    d="M 12 24 Q 50 44, 88 24 Q 74 41, 50 42 Q 26 41, 12 24 Z"
                    fill="#E06D54"
                  />
                </g>
              )}

              {viseme === 'wide' && (
                <g>
                  {/* Wide E / I vowel articulation */}
                  <path
                    d="M 8 22 Q 50 16, 92 22 Q 80 41, 50 42 Q 20 41, 8 22 Z"
                    fill="#381312"
                  />
                  <path
                    d="M 18 22 Q 50 19, 82 22 L 79 29 Q 50 31, 21 29 Z"
                    fill="#F4F6F1"
                  />
                  <ellipse cx="50" cy="37" rx="20" ry="4" fill="#BA4B42" />
                  <path
                    d="M 7 22 Q 30 14, 50 18 Q 70 14, 93 22 Q 50 19, 7 22 Z"
                    fill="#C25949"
                  />
                  <path
                    d="M 8 22 Q 50 46, 92 22 Q 78 44, 50 45 Q 22 44, 8 22 Z"
                    fill="#E16D53"
                  />
                </g>
              )}

              {viseme === 'open' && (
                <g>
                  {/* Open A / AH vowel articulation */}
                  <ellipse cx="50" cy="28" rx="34" ry="16" fill="#361110" />
                  <path
                    d="M 24 18 Q 50 16, 76 18 L 73 25 Q 50 26, 27 25 Z"
                    fill="#F3F5F0"
                  />
                  <ellipse cx="50" cy="36" rx="18" ry="6" fill="#C24E44" />
                  <ellipse
                    cx="50"
                    cy="28"
                    rx="35"
                    ry="16.5"
                    fill="none"
                    stroke="#CF624C"
                    strokeWidth="5.5"
                  />
                </g>
              )}

              {viseme === 'round' && (
                <g>
                  {/* Rounded O / U vowel articulation */}
                  <ellipse cx="50" cy="28" rx="22" ry="15" fill="#32100F" />
                  <path
                    d="M 34 19 Q 50 17, 66 19 L 64 24 Q 50 25, 36 24 Z"
                    fill="#F3F5F0"
                  />
                  <ellipse cx="50" cy="35" rx="11" ry="4.5" fill="#BA4B42" />
                  <ellipse
                    cx="50"
                    cy="28"
                    rx="23.5"
                    ry="15.5"
                    fill="none"
                    stroke="#C85D48"
                    strokeWidth="6.5"
                  />
                </g>
              )}
            </svg>
          )}
        </div>
      ) : (
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-[#994524] to-[#7b2f0f] text-white flex items-center justify-center"
          role="img"
          aria-label="Seapee's AI Assistant Headset Icon"
        >
          <HeadsetAvatarFallbackSvg className="w-5 h-5" />
        </div>
      )}
    </div>
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
    <div className="space-y-1.5 text-[13.5px] leading-relaxed">
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

export const AskSeapeeChatbot: React.FC<AskSeapeeChatbotProps> = ({
  onNavigate,
  onOpenResumeModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Default mode is strictly "chat" (Text Chat Mode)
  const [mode, setMode] = useState<InteractionMode>('chat');
  const [agentState, setAgentState] = useState<VoiceAgentState>('Ready');
  const [activeViseme, setActiveViseme] = useState<VisemeShape>('rest');
  const [isSending, setIsSending] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [voiceErrorNote, setVoiceErrorNote] = useState<string | null>(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: ChatMessage) => ({
            ...m,
            actions: m.actions?.filter(
              (a) => !a.href?.toLowerCase().includes('topmate') && a.label !== 'Talk to Seapee'
            ),
          }));
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_MESSAGES;
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const visemeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef = useRef<InteractionMode>('chat');
  const agentStateRef = useRef<VoiceAgentState>('Ready');
  const sendMessageRef = useRef<(text: string, originMode: InteractionMode) => Promise<void>>(
    async () => {}
  );

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    agentStateRef.current = agentState;
  }, [agentState]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  // Keep latest message visible whenever messages, typing state, or mode changes
  const scrollToLatestMessage = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToLatestMessage();
    }
  }, [isOpen, messages, isSending, interimTranscript, mode, scrollToLatestMessage]);

  // Focus text input when opening or switching to Chat Mode on desktop
  useEffect(() => {
    if (isOpen && mode === 'chat' && typeof window !== 'undefined' && window.innerWidth >= 640) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, mode]);

  // Preload synthesis voices lazily when Voice Mode is used
  useEffect(() => {
    if (mode === 'voice' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener?.('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener?.('voiceschanged', handleVoicesChanged);
      };
    }
  }, [mode]);

  const stopVisemeAnimation = useCallback(() => {
    if (visemeTimerRef.current) {
      clearInterval(visemeTimerRef.current);
      visemeTimerRef.current = null;
    }
    setActiveViseme('rest');
  }, []);

  const stopSpeechOutput = useCallback(() => {
    stopVisemeAnimation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [stopVisemeAnimation]);

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
    if (typeof window === 'undefined' || modeRef.current !== 'voice') return;

    stopSpeechOutput();
    setVoiceErrorNote(null);

    const SpeechRecognitionApi =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionApi) {
      setVoiceErrorNote(
        'Voice input is not supported in this browser. Switched to Chat Mode so you can type your questions.'
      );
      setMode('chat');
      modeRef.current = 'chat';
      setAgentState('Ready');
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
          setVoiceErrorNote(
            'Microphone access is blocked or unavailable. You can allow mic access in your browser or switch to Chat Mode.'
          );
          setAgentState('Muted');
        } else if (errorCode === 'no-speech') {
          if (modeRef.current === 'voice' && agentStateRef.current !== 'Muted') {
            setAgentState('Ready');
          }
        } else if (errorCode !== 'aborted') {
          setVoiceErrorNote('Voice recognition encountered an issue. You can tap the mic to retry or use Chat Mode.');
          setAgentState('Ready');
        }
      };

      recognition.onend = () => {
        const spokenQuestion = finalCaptured.trim();
        setInterimTranscript('');
        if (spokenQuestion && modeRef.current === 'voice') {
          sendMessageRef.current(spokenQuestion, 'voice');
        } else if (
          modeRef.current === 'voice' &&
          agentStateRef.current !== 'Thinking...' &&
          agentStateRef.current !== 'Speaking...' &&
          agentStateRef.current !== 'Muted'
        ) {
          setAgentState('Ready');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setVoiceErrorNote(
        'Voice input could not start on this device. Please use Chat Mode to type your questions.'
      );
      setAgentState('Ready');
    }
  }, [stopRecognition, stopSpeechOutput]);

  const speakTextInVoiceMode = useCallback(
    (textToSpeak: string, autoListenAfter: boolean) => {
      // NEVER play audio if user is in Chat Mode
      if (modeRef.current !== 'voice') {
        stopVisemeAnimation();
        setAgentState('Ready');
        return;
      }

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setVoiceErrorNote('Audio playback is not available in this browser. Answers are shown in the chat above.');
        stopVisemeAnimation();
        setAgentState('Ready');
        return;
      }

      stopRecognition();
      stopVisemeAnimation();
      window.speechSynthesis.cancel();

      const cleaned = stripMarkdownForSpeech(textToSpeak);
      if (!cleaned) {
        setAgentState('Ready');
        return;
      }

      const words = cleaned.split(/\s+/).filter(Boolean);
      let currentWordIndex = 0;
      let stepCounter = 0;

      const startLipSyncLoop = () => {
        if (visemeTimerRef.current) {
          clearInterval(visemeTimerRef.current);
        }
        visemeTimerRef.current = setInterval(() => {
          if (modeRef.current !== 'voice') {
            stopVisemeAnimation();
            return;
          }
          // Verify speechSynthesis is still actively speaking
          if (typeof window !== 'undefined' && 'speechSynthesis' in window && !window.speechSynthesis.speaking) {
            return;
          }
          const activeWord = words[currentWordIndex % Math.max(1, words.length)] || 'seapee';
          const nextShape = computeVisemeFromSyllable(activeWord, stepCounter);
          setActiveViseme(nextShape);
          stepCounter += 1;
          if (stepCounter % 3 === 0) {
            currentWordIndex = (currentWordIndex + 1) % Math.max(1, words.length);
          }
        }, 85);
      };

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const voices = window.speechSynthesis.getVoices();
      const chosenVoice = selectWarmFemaleVoice(voices);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      utterance.rate = 1.02;
      utterance.pitch = 1.03;

      utterance.onstart = () => {
        if (modeRef.current === 'voice') {
          setAgentState('Speaking...');
          startLipSyncLoop();
        } else {
          stopVisemeAnimation();
          window.speechSynthesis.cancel();
        }
      };

      utterance.onboundary = (event: SpeechSynthesisEvent) => {
        if (modeRef.current !== 'voice') return;
        if (typeof event.charIndex === 'number') {
          const slice = cleaned.slice(event.charIndex);
          const boundaryWord = slice.split(/\s+/)[0] || '';
          if (boundaryWord) {
            setActiveViseme(computeVisemeFromSyllable(boundaryWord, stepCounter++));
          }
        }
      };

      utterance.onend = () => {
        stopVisemeAnimation();
        if (
          autoListenAfter &&
          modeRef.current === 'voice' &&
          agentStateRef.current !== 'Muted'
        ) {
          setTimeout(() => {
            if (modeRef.current === 'voice' && agentStateRef.current !== 'Muted') {
              startListening();
            }
          }, 240);
        } else if (agentStateRef.current !== 'Muted') {
          setAgentState('Ready');
        }
      };

      utterance.onerror = () => {
        stopVisemeAnimation();
        if (agentStateRef.current !== 'Muted') {
          setAgentState('Ready');
        }
      };

      setAgentState('Speaking...');
      startLipSyncLoop();
      window.speechSynthesis.speak(utterance);
    },
    [startListening, stopRecognition, stopVisemeAnimation]
  );

  const sendMessage = useCallback(
    async (questionText: string, originMode: InteractionMode) => {
      const trimmed = questionText.trim();
      if (!trimmed || isSending) return;

      // Always stop any active recognition or speech when a new query is submitted
      stopRecognition();
      stopSpeechOutput();

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
      };

      const updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);
      setInputValue('');
      setIsSending(true);
      if (originMode === 'voice') {
        setAgentState('Thinking...');
      }

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
          // Fallback to deterministic local grounded engine
        }

        if (!replyData) {
          await new Promise((resolve) => setTimeout(resolve, 200));
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

        // STRICT MODE SEPARATION:
        // Only play audio if the message was triggered in Voice Mode AND the user is still in Voice Mode.
        // In Chat Mode, NEVER play audio or activate microphone.
        if (originMode === 'voice' && modeRef.current === 'voice') {
          speakTextInVoiceMode(spoken, true);
        } else {
          setAgentState('Ready');
        }
      } catch {
        setAgentState('Ready');
      } finally {
        setIsSending(false);
      }
    },
    [isSending, messages, speakTextInVoiceMode, stopRecognition, stopSpeechOutput]
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

  // Explicitly switch to Chat Mode (Default): immediately stop all mic & audio
  const switchToChatMode = useCallback(() => {
    stopRecognition();
    stopSpeechOutput();
    setMode('chat');
    modeRef.current = 'chat';
    setAgentState('Ready');
    setVoiceErrorNote(null);
  }, [stopRecognition, stopSpeechOutput]);

  // Explicitly switch to Voice Mode: activate dedicated bottom voice dock and start listening
  const switchToVoiceMode = useCallback(() => {
    setVoiceErrorNote(null);
    setMode('voice');
    modeRef.current = 'voice';
    setAgentState('Ready');
    setTimeout(() => {
      if (modeRef.current === 'voice') {
        startListening();
      }
    }, 80);
  }, [startListening]);

  const handleVoiceMicButton = () => {
    if (mode !== 'voice') {
      switchToVoiceMode();
      return;
    }

    // In Voice Mode: if AI is currently speaking, interrupt immediately and listen
    if (agentState === 'Speaking...') {
      stopSpeechOutput();
      startListening();
      return;
    }

    // If currently listening, pause/stop listening
    if (agentState === 'Listening...') {
      stopRecognition();
      setAgentState('Ready');
      return;
    }

    // Otherwise (Ready or Muted), start listening
    startListening();
  };

  const handleToggleMuteInVoiceMode = () => {
    if (agentState === 'Muted') {
      startListening();
    } else {
      stopRecognition();
      stopSpeechOutput();
      setAgentState('Muted');
    }
  };

  const handleClearConversation = () => {
    stopRecognition();
    stopSpeechOutput();
    setMessages(INITIAL_MESSAGES);
    setShowAllSuggestions(false);
    setVoiceErrorNote(null);
    setAgentState('Ready');
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
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
    if (action.printResume) {
      triggerResumePrint();
      return;
    }
    if (action.openResumeModal && onOpenResumeModal) {
      onOpenResumeModal();
      if (window.innerWidth < 640) {
        stopRecognition();
        stopSpeechOutput();
        setIsOpen(false);
      }
      return;
    }
    if (action.sectionId === 'resume') {
      const resumeEl = document.getElementById('resume');
      if (resumeEl) {
        resumeEl.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/', 'resume');
      }
    } else if (onNavigate) {
      onNavigate(action.href, action.sectionId);
    } else if (action.sectionId) {
      const el = document.getElementById(action.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (window.innerWidth < 640) {
      stopRecognition();
      stopSpeechOutput();
      setIsOpen(false);
    }
  };

  const handleChatFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;
    // Ensure typing ALWAYS stays in Chat Mode with zero audio or mic activation
    if (mode !== 'chat') {
      switchToChatMode();
    }
    sendMessage(inputValue, 'chat');
  };

  const handleSuggestionClick = (question: string) => {
    // Clicking a chip uses the currently selected mode (text-only in Chat Mode; spoken in Voice Mode)
    sendMessage(question, mode);
  };

  const handleTogglePanelOpen = () => {
    if (isOpen) {
      stopRecognition();
      stopSpeechOutput();
      setMode('chat');
      modeRef.current = 'chat';
      setAgentState('Ready');
      setIsOpen(false);
    } else {
      // Always open in clean Default Chat Mode
      setMode('chat');
      modeRef.current = 'chat';
      setAgentState('Ready');
      setVoiceErrorNote(null);
      setIsOpen(true);
    }
  };

  const visibleSuggestions = showAllSuggestions
    ? ASK_SEAPEE_SUGGESTED_QUESTIONS
    : ASK_SEAPEE_SUGGESTED_QUESTIONS.slice(0, 5);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {/* Assistant Window */}
      {isOpen && (
        <section
          aria-label="Ask Me Anything — Seapee's AI Assistant"
          className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[min(600px,calc(100dvh-6.5rem))] bg-[#fbf9f6] border border-[#dbc1b8] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Compact Top Header + Mode Switcher (Never blocks messages) */}
          <div className="bg-white px-3.5 py-3 border-b border-[#e4e2df] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <AiAssistantAvatar
                  sizeClass="w-11 h-11"
                  isSpeaking={mode === 'voice' && agentState === 'Speaking...'}
                  viseme={activeViseme}
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2e7d32] ring-2 ring-white"
                  title="Online"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-serif text-sm font-bold tracking-wide text-[#1b1c1a] truncate">
                    Seapee&apos;s AI Assistant
                  </p>
                </div>
                <p className="text-[11px] text-[#546252] truncate">
                  {mode === 'chat' ? 'Chat Mode • Text responses' : `Voice Mode • ${agentState}`}
                </p>
              </div>
            </div>

            {/* Clear Segmented Mode Switcher: Chat | Voice */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                role="tablist"
                aria-label="Assistant interaction mode"
                className="inline-flex items-center bg-[#f5f3f0] p-0.5 rounded-xl border border-[#e4e2df]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'chat'}
                  onClick={switchToChatMode}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    mode === 'chat'
                      ? 'bg-[#1b1c1a] text-white shadow-2xs'
                      : 'text-[#55433c] hover:text-[#1b1c1a]'
                  }`}
                >
                  Chat
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'voice'}
                  onClick={switchToVoiceMode}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    mode === 'voice'
                      ? 'bg-[#994524] text-white shadow-2xs'
                      : 'text-[#55433c] hover:text-[#1b1c1a]'
                  }`}
                >
                  <MicSvg className="w-3 h-3" />
                  <span>Voice</span>
                </button>
              </div>

              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearConversation}
                  className="p-1.5 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer text-[11px] font-medium"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  Reset
                </button>
              )}

              <button
                type="button"
                onClick={handleTogglePanelOpen}
                className="p-1 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
                title="Close assistant"
                aria-label="Close assistant"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>
          </div>

          {/* Unobstructed Scrollable Conversation Area (Full Height) */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 custom-scrollbar"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#546252] mb-1 px-1">
                  {msg.role === 'user' ? 'You' : "Seapee's AI"}
                </span>
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 ${
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

                {/* Source Badge */}
                {msg.role === 'assistant' && msg.sourceNote && (
                  <div className="mt-1 px-1 flex items-center gap-2 text-[10px] text-[#546252]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px] text-[#994524]">
                        verified
                      </span>
                      <span>{msg.sourceNote}</span>
                    </span>
                  </div>
                )}

                {/* Contextual Follow-Up Chips */}
                {msg.role === 'assistant' &&
                  msg.followUpSuggestions &&
                  msg.followUpSuggestions.length > 0 &&
                  msg.id === messages[messages.length - 1]?.id &&
                  !isSending && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.followUpSuggestions.map((followUp) => (
                        <button
                          key={followUp}
                          type="button"
                          onClick={() => handleSuggestionClick(followUp)}
                          className="text-left text-xs px-2.5 py-1 rounded-xl bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] hover:border-[#dbc1b8] transition-colors cursor-pointer"
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing / Thinking Indicator inside Chat */}
            {isSending && (
              <div className="flex items-start">
                <div className="bg-white border border-[#e4e2df] rounded-2xl rounded-bl-xs px-3.5 py-2 text-xs text-[#546252] flex items-center gap-2 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#994524] animate-pulse" />
                  <span>Seapee&apos;s AI is writing...</span>
                </div>
              </div>
            )}

            {/* Suggested Starter Questions */}
            {messages.length <= 2 && !isSending && (
              <div className="pt-2 border-t border-[#e4e2df]/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#546252]">
                    Suggested Questions
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAllSuggestions((prev) => !prev)}
                    className="text-[11px] font-semibold text-[#994524] hover:underline cursor-pointer"
                  >
                    {showAllSuggestions
                      ? 'Show fewer'
                      : `View all ${ASK_SEAPEE_SUGGESTED_QUESTIONS.length}`}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {visibleSuggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSuggestionClick(question)}
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

          {/* Non-blocking Voice Error Banner (if microphone or speech recognition fails) */}
          {voiceErrorNote && (
            <div className="px-3.5 py-2 bg-[#ffdbcf]/50 border-t border-[#dbc1b8] flex items-center justify-between gap-2 text-[11px] text-[#7b2f0f] shrink-0">
              <span>{voiceErrorNote}</span>
              <button
                type="button"
                onClick={switchToChatMode}
                className="px-2 py-0.5 rounded bg-white text-[#1b1c1a] font-semibold border border-[#dbc1b8] shrink-0 cursor-pointer"
              >
                Use Chat
              </button>
            </div>
          )}

          {/* BOTTOM INTERACTION BAR: Strictly separated by mode */}
          {mode === 'chat' ? (
            /* 1. CHAT MODE (DEFAULT): Clean Text Input Bar + Optional Button to Enter Voice Mode */
            <form
              onSubmit={handleChatFormSubmit}
              className="p-3 bg-white border-t border-[#e4e2df] flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a question for Seapee's AI..."
                aria-label="Type a question for Seapee's AI"
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-[13.5px] bg-[#fbf9f6] border border-[#e4e2df] rounded-xl focus:outline-none focus:border-[#994524] text-[#1b1c1a] placeholder:text-[#88726b]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                aria-label="Send message"
                className="px-3.5 py-2.5 rounded-xl bg-[#994524] hover:bg-[#7b2f0f] disabled:opacity-45 text-white text-xs font-semibold inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
              <button
                type="button"
                onClick={switchToVoiceMode}
                title="Switch to Voice Mode (Talk to Seapee's AI)"
                aria-label="Switch to Voice Mode"
                className="p-2.5 rounded-xl bg-[#f5f3f0] hover:bg-[#ffdbcf]/60 text-[#55433c] hover:text-[#994524] border border-[#e4e2df] transition-colors cursor-pointer shrink-0"
              >
                <MicSvg className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* 2. VOICE MODE: Compact Bottom Talking Avatar + Voice Dock (Never covers the chat transcript above) */
            <div className="p-3 bg-white border-t border-[#dbc1b8] flex flex-col gap-2 shrink-0">
              <div className="flex items-center justify-between gap-2.5">
                {/* Left: Live Talking Seapee Avatar with Synchronized Mouth Movement + Mic Control */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    {agentState === 'Speaking...' && (
                      <span
                        aria-hidden="true"
                        className="absolute -inset-1 rounded-full bg-[#994524]/20 animate-pulse"
                      />
                    )}
                    <AiAssistantAvatar
                      sizeClass="w-14 h-14"
                      isSpeaking={agentState === 'Speaking...'}
                      viseme={activeViseme}
                    />
                  </div>

                  <div className="relative flex items-center justify-center shrink-0">
                    {agentState === 'Listening...' && (
                      <span className="absolute w-11 h-11 rounded-full bg-[#994524]/25 animate-ping" />
                    )}
                    <button
                      type="button"
                      onClick={handleVoiceMicButton}
                      aria-label={
                        agentState === 'Listening...'
                          ? 'Stop listening'
                          : agentState === 'Speaking...'
                          ? 'Interrupt and speak'
                          : 'Start speaking'
                      }
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                        agentState === 'Listening...'
                          ? 'bg-[#994524] text-white ring-3 ring-[#ffdbcf]'
                          : agentState === 'Speaking...'
                          ? 'bg-[#546252] text-white ring-2 ring-[#dcfce7]'
                          : agentState === 'Thinking...'
                          ? 'bg-[#1b1c1a] text-white opacity-90'
                          : agentState === 'Muted'
                          ? 'bg-[#e4e2df] text-[#55433c]'
                          : 'bg-[#1b1c1a] hover:bg-[#994524] text-white'
                      }`}
                    >
                      {agentState === 'Muted' ? (
                        <MicOffSvg className="w-4 h-4" />
                      ) : agentState === 'Speaking...' ? (
                        <div className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
                          <span className="w-0.5 bg-white rounded-full h-2 animate-bounce" />
                          <span className="w-0.5 bg-white rounded-full h-3.5 animate-pulse" />
                          <span className="w-0.5 bg-white rounded-full h-2.5 animate-bounce" />
                        </div>
                      ) : agentState === 'Thinking...' ? (
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <MicSvg className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-[#1b1c1a]">
                        {agentState}
                      </span>
                      {agentState === 'Speaking...' && (
                        <button
                          type="button"
                          onClick={handleVoiceMicButton}
                          className="text-[11px] font-semibold text-[#994524] hover:underline cursor-pointer"
                        >
                          • Interrupt
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-[#55433c] truncate">
                      {agentState === 'Listening...'
                        ? interimTranscript
                          ? `"${interimTranscript}"`
                          : 'Speak naturally now...'
                        : agentState === 'Speaking...'
                        ? 'Seapee AI is speaking...'
                        : agentState === 'Thinking...'
                        ? 'Generating response...'
                        : agentState === 'Muted'
                        ? 'Microphone is muted'
                        : 'Tap mic to speak'}
                    </p>
                  </div>
                </div>

                {/* Right: Mute Toggle & Exit Voice Mode back to Chat Mode */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleToggleMuteInVoiceMode}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                      agentState === 'Muted'
                        ? 'bg-[#994524] text-white border-[#994524]'
                        : 'bg-[#fbf9f6] hover:bg-[#efeeeb] text-[#55433c] border-[#e4e2df]'
                    }`}
                  >
                    {agentState === 'Muted' ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    type="button"
                    onClick={switchToChatMode}
                    className="px-2.5 py-1.5 rounded-lg bg-[#1b1c1a] hover:bg-[#994524] text-white text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Chat
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Floating Primary AI Button: "Ask Me Anything" (compact on mobile so it never covers card text) */}
      <button
        type="button"
        onClick={handleTogglePanelOpen}
        aria-expanded={isOpen}
        aria-label="Ask Me Anything — Interactive AI Assistant for Seapee Bajaj"
        title="Ask Me Anything — Seapee's AI Assistant (Chat & Voice)"
        className="group flex items-center gap-1.5 sm:gap-2.5 bg-[#1b1c1a] hover:bg-[#994524] text-white pl-2.5 pr-3 py-2 sm:pl-3.5 sm:pr-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl border border-[#dbc1b8]/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <span className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#994524] group-hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors">
          {isOpen ? (
            <span className="material-symbols-outlined text-[15px] sm:text-[17px]">close</span>
          ) : (
            <AiChatSvg className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </span>
        <span className="flex flex-col items-start text-left leading-none pr-0.5">
          <span className="text-[11px] sm:text-[13px] font-semibold tracking-wide flex items-center gap-1.5">
            <span>Ask Me Anything</span>
          </span>
          <span className="text-[10px] text-[#dbc1b8] group-hover:text-white/90 font-normal mt-0.5 hidden sm:inline">
            Seapee&apos;s AI Assistant • Chat &amp; Voice
          </span>
        </span>
      </button>
    </div>
  );
};
