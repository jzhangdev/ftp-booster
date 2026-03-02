import type { Interrupt, Message } from "@langchain/langgraph-sdk";

import type { FtpUIMessage } from "@/types/chat-message";
import type { CyclingFtpBoosterPlan } from "@/types/plan";

type ContentPart = {
  type?: unknown;
  text?: unknown;
  output?: unknown;
  question?: unknown;
  answer?: unknown;
};

type InterruptValue = {
  type?: unknown;
  question?: unknown;
};

const asArrayContent = (content: Message["content"]): ContentPart[] => {
  if (Array.isArray(content)) {
    return content as ContentPart[];
  }
  return [];
};

const asTextContent = (content: Message["content"]): string | null => {
  if (typeof content === "string") {
    return content;
  }

  for (const part of asArrayContent(content)) {
    if (part.type === "text" && typeof part.text === "string") {
      return part.text;
    }
    if (typeof part.text === "string") {
      return part.text;
    }
  }

  return null;
};

const asPlanOutput = (value: unknown): CyclingFtpBoosterPlan | null => {
  if (value && typeof value === "object") {
    return value as CyclingFtpBoosterPlan;
  }
  return null;
};

const buildInterruptId = (interrupt: Interrupt<unknown>) => {
  const type =
    interrupt.value && typeof interrupt.value === "object"
      ? String((interrupt.value as InterruptValue).type ?? "unknown")
      : "unknown";
  const ns = interrupt.ns?.join(".") ?? "root";

  return `interrupt:${ns}:${interrupt.when}:${type}`;
};

const buildMessageId = (message: Message, index: number) => {
  return message.id ?? `langgraph:${message.type}:${index}`;
};

const normalizeMessage = (message: Message, index: number): FtpUIMessage | null => {
  switch (message.type) {
    case "system": {
      const text = asTextContent(message.content);
      if (!text) {
        return null;
      }

      return {
        id: buildMessageId(message, index),
        role: "system",
        metadata: {
          source: "langgraph",
          originalRole: "system",
        },
        parts: [
          {
            type: "data-status",
            data: {
              kind: "system",
              text,
            },
          },
        ],
      };
    }

    case "ai": {
      const content = asArrayContent(message.content);

      for (const part of content) {
        if (part.type === "planning") {
          const output = asPlanOutput(part.output);
          if (!output) {
            continue;
          }

          return {
            id: buildMessageId(message, index),
            role: "assistant",
            metadata: {
              source: "langgraph",
              originalRole: "assistant",
            },
            parts: [
              {
                type: "data-plan",
                data: {
                  output,
                },
              },
            ],
          };
        }

        if (part.type === "text" && typeof part.text === "string") {
          return {
            id: buildMessageId(message, index),
            role: "assistant",
            metadata: {
              source: "langgraph",
              originalRole: "assistant",
            },
            parts: [
              {
                type: "data-status",
                data: {
                  kind: "assistant",
                  text: part.text,
                },
              },
            ],
          };
        }
      }

      const fallbackText = asTextContent(message.content);
      if (!fallbackText) {
        return null;
      }

      return {
        id: buildMessageId(message, index),
        role: "assistant",
        metadata: {
          source: "langgraph",
          originalRole: "assistant",
        },
        parts: [
          {
            type: "data-status",
            data: {
              kind: "assistant",
              text: fallbackText,
            },
          },
        ],
      };
    }

    case "human": {
      const content = asArrayContent(message.content);
      for (const part of content) {
        if (
          part.type === "question" &&
          typeof part.question === "string" &&
          typeof part.answer === "string"
        ) {
          return {
            id: buildMessageId(message, index),
            role: "user",
            metadata: {
              source: "langgraph",
              originalRole: "user",
            },
            parts: [
              {
                type: "data-question",
                data: {
                  question: part.question,
                  answer: part.answer,
                },
              },
            ],
          };
        }
      }

      return null;
    }

    default:
      return null;
  }
};

const normalizeInterrupt = (interrupt?: Interrupt<unknown>): FtpUIMessage | null => {
  if (!interrupt || !interrupt.value || typeof interrupt.value !== "object") {
    return null;
  }

  const value = interrupt.value as InterruptValue;

  if (value.type === "requestImportStravaData") {
    return {
      id: buildInterruptId(interrupt),
      role: "user",
      metadata: {
        source: "langgraph",
        originalRole: "interrupt",
      },
      parts: [
        {
          type: "data-interruptRequestImportStrava",
          id: buildInterruptId(interrupt),
          data: {
            question:
              typeof value.question === "string"
                ? value.question
                : "Would you like to import your Strava data?",
          },
        },
      ],
    };
  }

  if (value.type === "setupTrainingGoal") {
    return {
      id: buildInterruptId(interrupt),
      role: "user",
      metadata: {
        source: "langgraph",
        originalRole: "interrupt",
      },
      parts: [
        {
          type: "data-interruptSetupTrainingGoal",
          id: buildInterruptId(interrupt),
          data: {
            question:
              typeof value.question === "string"
                ? value.question
                : "Enter your training goals:",
          },
        },
      ],
    };
  }

  return null;
};

export const normalizeLanggraphMessages = (
  messages: Message[],
  interrupt?: Interrupt<unknown>
): FtpUIMessage[] => {
  const normalizedMessages: FtpUIMessage[] = [];

  for (const [index, message] of messages.entries()) {
    const normalized = normalizeMessage(message, index);
    if (normalized) {
      normalizedMessages.push(normalized);
    }
  }

  const interruptMessage = normalizeInterrupt(interrupt);
  if (interruptMessage) {
    normalizedMessages.push(interruptMessage);
  }

  return normalizedMessages;
};
