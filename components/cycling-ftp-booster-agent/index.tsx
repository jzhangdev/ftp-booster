"use client";

import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { useStream } from "@langchain/langgraph-sdk/react";
import { useLayoutEffect, useState } from "react";
import { SystemMessage } from "./system-message";
import { RequestImportStravaDataInterrupt } from "./request-import-strava-data-interrupt";
import { QuestionMessage } from "./question-message";
import { SetupTrainingGoalInterrupt } from "./setup-training-goal-interrupt";
import { AiMessage } from "./ai-message";
import { PlanningMessage } from "./planning-message";

export const CyclingFtpBoosterAgent = () => {
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isConnectingToStrava, setIsConnectingToStrava] =
    useState<boolean>(false);

  const thread = useStream({
    apiUrl: process.env.NEXT_PUBLIC_GRAPH_API,
    assistantId: "FTPBooster",
    threadId,
    onThreadId: setThreadId,
  });

  const onConfirmConnectToStrava = async () => {
    setIsConnectingToStrava(true);
    try {
      const response = await fetch("/api/strava/activities");
      if (response.status === 200) {
        const data = await response.json();
        return Promise.resolve(data);
      }
      if (response.status === 401) {
        const { redirectUrl } = await response.json();
        window.location.href = redirectUrl;
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsConnectingToStrava(false);
    }
  };

  useLayoutEffect(() => {
    if (!isStarting) {
      setIsStarting(true);
      thread.submit({
        messages: [],
      });
    }
  }, [isStarting, thread]);

  return (
    <Container>
      <Box py="4">
        <Heading>🚴 Cycling FTP Booster</Heading>
      </Box>
      <Stack>
        {thread.messages.map((message) => {
          switch (message.type) {
            case "system":
              return (
                <SystemMessage key={message.id}>
                  {message.content as string}
                </SystemMessage>
              );
            case "ai":
              if (message.content[0]) {
                switch (
                  (message.content[0] as Record<string, unknown>)["type"]
                ) {
                  case "text":
                    return (
                      <AiMessage>
                        {(message.content[0] as Record<string, string>).text}
                      </AiMessage>
                    );
                  case "planning":
                    return (
                      <PlanningMessage
                        data={
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (message.content[0] as Record<string, any>)["output"]
                        }
                      />
                    );

                  default:
                    return <AiMessage>Loading...</AiMessage>;
                }
              }

            case "human":
              if (message.content[0]) {
                switch (
                  (message.content[0] as Record<string, unknown>)["type"]
                ) {
                  case "question":
                    return (
                      <Box alignSelf="end">
                        <QuestionMessage
                          question={
                            (message.content[0] as Record<string, string>)[
                              "question"
                            ]
                          }
                          answer={
                            (message.content[0] as Record<string, string>)[
                              "answer"
                            ]
                          }
                        />
                      </Box>
                    );

                  default:
                    return null;
                }
              }

            default:
              return null;
          }
        })}
        {thread.interrupt && (
          <>
            {(thread.interrupt.value as Record<string, unknown>).type ===
              "requestImportStravaData" && (
              <Box alignSelf="end">
                <RequestImportStravaDataInterrupt
                  isLoading={isConnectingToStrava}
                  onYes={async () => {
                    const activities = await onConfirmConnectToStrava();
                    thread.submit(undefined, {
                      command: { resume: { value: true, activities } },
                    });
                  }}
                  onNo={() => {
                    thread.submit(undefined, {
                      command: { resume: { value: false } },
                    });
                  }}
                >
                  {(thread.interrupt.value as Record<string, string>).question}
                </RequestImportStravaDataInterrupt>
              </Box>
            )}
            {(thread.interrupt.value as Record<string, unknown>).type ===
              "setupTrainingGoal" && (
              <Box alignSelf="end">
                <SetupTrainingGoalInterrupt
                  isSubmitting={thread.isLoading}
                  onSubmit={(data) => {
                    thread.submit(undefined, {
                      command: {
                        resume: data,
                      },
                    });
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};
