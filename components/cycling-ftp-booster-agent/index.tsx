"use client";

import { useStream } from "@langchain/langgraph-sdk/react";
import { useEffect, useMemo, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Card, CardContent } from "@/components/ui/card";
import type { FtpUIMessage } from "@/types/chat-message";
import type { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import { normalizeLanggraphMessages } from "@/utils/chat/normalize-langgraph";

import { MessagePartRenderer } from "./message-part-renderer";
import { SystemMessage } from "./system-message";

type DataMessagePart = Extract<
  FtpUIMessage["parts"][number],
  { type: `data-${string}` }
>;

const isDataPart = (
  part: FtpUIMessage["parts"][number]
): part is DataMessagePart => {
  return part.type.startsWith("data-");
};

export const CyclingFtpBoosterAgent = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isConnectingToStrava, setIsConnectingToStrava] = useState(false);

  const thread = useStream({
    apiUrl: process.env.NEXT_PUBLIC_GRAPH_API,
    assistantId: "FTPBooster",
    threadId,
    onThreadId: (nextThreadId) => {
      setThreadId(nextThreadId);
    },
  });

  const uiMessages = useMemo(
    () => normalizeLanggraphMessages(thread.messages, thread.interrupt),
    [thread.messages, thread.interrupt]
  );

  const onConfirmConnectToStrava = async () => {
    setIsConnectingToStrava(true);

    try {
      const response = await fetch("/api/strava/activities");
      if (response.status === 200) {
        const activities = await response.json();
        thread.submit(undefined, {
          command: {
            resume: { value: true, activities },
          },
        });
        return;
      }

      if (response.status === 401) {
        const { redirectUrl } = await response.json();
        window.location.href = redirectUrl;
      }
    } finally {
      setIsConnectingToStrava(false);
    }
  };

  const onSkipConnectToStrava = () => {
    thread.submit(undefined, {
      command: {
        resume: { value: false },
      },
    });
  };

  const onSubmitTrainingGoal = (data: CyclingFtpBoosterFormSchema) => {
    thread.submit(undefined, {
      command: {
        resume: data,
      },
    });
  };

  useEffect(() => {
    if (!threadId && !thread.isLoading) {
      thread.submit({
        messages: [],
      });
    }
  }, [threadId, thread]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <Card className="overflow-hidden border-sky-200/70 bg-white/75 shadow-lg backdrop-blur-sm">
        <CardContent className="p-0">
          <header className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-emerald-50 px-5 py-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              🚴 Cycling FTP Booster
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Personalized FTP planning powered by LangGraph and streaming AI responses.
            </p>
          </header>

          <Conversation className="h-[calc(100vh-260px)] sm:h-[calc(100vh-220px)]">
            <ConversationContent className="gap-1 px-4 py-4 sm:px-5">
              {!threadId ? (
                <SystemMessage>🚴🚴‍♀️🚴‍♂️ Starting new thread...</SystemMessage>
              ) : null}

              {uiMessages.map((message) =>
                message.parts.map((part, partIndex) => {
                  if (!isDataPart(part)) {
                    return null;
                  }

                  const key = "id" in part && part.id ? part.id : `${message.id}:${partIndex}`;

                  return (
                    <MessagePartRenderer
                      key={key}
                      part={part}
                      isConnectingToStrava={isConnectingToStrava}
                      isSubmittingTrainingGoal={thread.isLoading}
                      onConfirmConnectToStrava={onConfirmConnectToStrava}
                      onSkipConnectToStrava={onSkipConnectToStrava}
                      onSubmitTrainingGoal={onSubmitTrainingGoal}
                    />
                  );
                })
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CardContent>
      </Card>
    </main>
  );
};
