import { GoogleGenAI, Type } from '@google/genai';
import {
  ASK_SEAPEE_SYSTEM_INSTRUCTION,
  buildGroundedFallbackReply,
  isPromptInjectionAttempt,
  type AskSeapeeReply,
} from '../src/services/askSeapeeKnowledge';

export interface ChatHistoryTurn {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateAskSeapeeResponse(
  message: string,
  history: ChatHistoryTurn[] = []
): Promise<AskSeapeeReply> {
  const trimmed = (message || '').trim().slice(0, 1200);
  if (!trimmed) {
    return buildGroundedFallbackReply('What does Seapee do?');
  }

  // Enforce prompt injection guardrail before invoking LLM
  if (isPromptInjectionAttempt(trimmed)) {
    return buildGroundedFallbackReply(trimmed);
  }

  const fallback = buildGroundedFallbackReply(trimmed);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const recentHistory = history
      .slice(-6)
      .map((turn) => `${turn.role === 'user' ? 'Visitor' : 'Ask Seapee'}: ${turn.content}`)
      .join('\n');

    const promptText = recentHistory
      ? `Recent conversation:\n${recentHistory}\n\nVisitor's current question: ${trimmed}`
      : `Visitor's question: ${trimmed}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: ASK_SEAPEE_SYSTEM_INSTRUCTION,
        temperature: 0.35,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description:
                'Concise, warm, professional, source-grounded answer (use **bold** for key terms and • for bullet points when helpful). Never invent facts.',
            },
            sourceNote: {
              type: Type.STRING,
              description:
                'One of: "Portfolio Verified", "Inferred from Portfolio Work", or "Direct Inquiry Recommended".',
            },
            followUpSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: '2 to 3 natural follow-up questions the visitor might ask next.',
            },
          },
          required: ['answer', 'sourceNote'],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      return fallback;
    }

    const parsed = JSON.parse(rawText) as Partial<AskSeapeeReply>;
    if (!parsed.answer || typeof parsed.answer !== 'string') {
      return fallback;
    }

    const validSourceNote: AskSeapeeReply['sourceNote'] =
      parsed.sourceNote === 'Inferred from Portfolio Work' ||
      parsed.sourceNote === 'Direct Inquiry Recommended'
        ? parsed.sourceNote
        : 'Portfolio Verified';

    return {
      answer: parsed.answer,
      sourceNote: validSourceNote,
      actions: fallback.actions,
      followUpSuggestions:
        Array.isArray(parsed.followUpSuggestions) && parsed.followUpSuggestions.length > 0
          ? parsed.followUpSuggestions.slice(0, 3)
          : fallback.followUpSuggestions,
    };
  } catch {
    return fallback;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const message = typeof body.message === 'string' ? body.message : '';
    const history = Array.isArray(body.history) ? body.history : [];

    const reply = await generateAskSeapeeResponse(message, history);
    res.status(200).json(reply);
  } catch {
    const fallback = buildGroundedFallbackReply('');
    res.status(200).json(fallback);
  }
}
