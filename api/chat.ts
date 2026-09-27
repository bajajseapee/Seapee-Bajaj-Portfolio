import { GoogleGenAI, Type } from '@google/genai';
import {
  ASK_SEAPEE_SYSTEM_INSTRUCTION,
  DIRECT_INQUIRY_ACTIONS,
  buildGroundedFallbackReply,
  isPromptInjectionAttempt,
  stripMarkdownForSpeech,
  type AskSeapeeReply,
  type ConversationTurn,
} from '../src/services/askSeapeeKnowledge';

export type ChatHistoryTurn = ConversationTurn;

export async function generateAskSeapeeResponse(
  message: string,
  history: ChatHistoryTurn[] = []
): Promise<AskSeapeeReply> {
  const trimmed = (message || '').trim().slice(0, 1200);
  if (!trimmed) {
    return buildGroundedFallbackReply('What exactly does Seapee do?', history);
  }

  // Enforce prompt injection guardrail before invoking LLM
  if (isPromptInjectionAttempt(trimmed)) {
    return buildGroundedFallbackReply(trimmed, history);
  }

  const fallback = buildGroundedFallbackReply(trimmed, history);

  // If deterministic guardrail already identified an unverified/out-of-scope query (pricing, availability, unlisted company/tool, private info), return it immediately without risking LLM speculation
  if (fallback.sourceNote === 'Direct Inquiry Recommended') {
    return fallback;
  }

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
      .slice(-8)
      .map((turn) => `${turn.role === 'user' ? 'Visitor' : 'Seapee AI'}: ${turn.content}`)
      .join('\n');

    const promptText = recentHistory
      ? `Recent conversation:\n${recentHistory}\n\nVisitor's spoken/written question: ${trimmed}`
      : `Visitor's spoken/written question: ${trimmed}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: ASK_SEAPEE_SYSTEM_INSTRUCTION,
        temperature: 0.1,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description:
                'Natural, warm, conversational response (1 to 4 sentences unless the visitor explicitly asks for detail). Grounded strictly in Seapee Bajaj portfolio facts. Never guess, infer, or extrapolate.',
            },
            sourceNote: {
              type: Type.STRING,
              description:
                'Either "Portfolio Verified" (if 100% explicitly supported by the portfolio knowledge base) or "Direct Inquiry Recommended" (if any part of the question is not explicitly in the knowledge base).',
            },
            followUpSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: '2 to 3 short, natural follow-up questions the visitor might ask next.',
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

    const answerLower = parsed.answer.toLowerCase();
    const indicatesUncertaintyOrRedirect =
      parsed.sourceNote === 'Direct Inquiry Recommended' ||
      answerLower.includes("don't have") ||
      answerLower.includes('do not have') ||
      answerLower.includes("isn't listed") ||
      answerLower.includes('not listed') ||
      answerLower.includes("not sure") ||
      answerLower.includes("don't want to guess") ||
      answerLower.includes("don't want to make assumptions") ||
      answerLower.includes('contact seapee directly') ||
      answerLower.includes('ask seapee directly');

    const validSourceNote: AskSeapeeReply['sourceNote'] = indicatesUncertaintyOrRedirect
      ? 'Direct Inquiry Recommended'
      : 'Portfolio Verified';

    return {
      answer: parsed.answer,
      spokenText: stripMarkdownForSpeech(parsed.answer),
      sourceNote: validSourceNote,
      actions:
        validSourceNote === 'Direct Inquiry Recommended'
          ? DIRECT_INQUIRY_ACTIONS
          : fallback.actions,
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
