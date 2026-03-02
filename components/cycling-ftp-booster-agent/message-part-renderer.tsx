import type { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import type { FtpUIMessage } from "@/types/chat-message";
import { Badge } from "@/components/ui/badge";

import { Message, MessageAvatar, MessageContent } from "@/components/ai-elements/message";
import { PlanningMessage } from "./planning-message";
import { QuestionMessage } from "./question-message";
import { RequestImportStravaDataInterrupt } from "./request-import-strava-data-interrupt";
import { SetupTrainingGoalInterrupt } from "./setup-training-goal-interrupt";

type MessagePart = FtpUIMessage["parts"][number];
type DataMessagePart = Extract<MessagePart, { type: `data-${string}` }>;

interface Props {
  part: DataMessagePart;
  isConnectingToStrava: boolean;
  isSubmittingTrainingGoal: boolean;
  onConfirmConnectToStrava: () => Promise<void>;
  onSkipConnectToStrava: () => void;
  onSubmitTrainingGoal: (data: CyclingFtpBoosterFormSchema) => void;
}

const assertNever = (value: never) => {
  throw new Error(`Unhandled message part type: ${String(value)}`);
};

export const MessagePartRenderer = ({
  part,
  isConnectingToStrava,
  isSubmittingTrainingGoal,
  onConfirmConnectToStrava,
  onSkipConnectToStrava,
  onSubmitTrainingGoal,
}: Props) => {
  switch (part.type) {
    case "data-status": {
      return (
        <Message from="assistant">
          <MessageAvatar from="assistant" />
          <MessageContent
            className={
              part.data.kind === "system"
                ? "bg-amber-50 text-slate-800 border border-amber-200/80"
                : undefined
            }
          >
            {part.data.kind === "system" ? (
              <Badge
                variant="secondary"
                className="mb-2 w-fit bg-amber-100 text-amber-900"
              >
                System
              </Badge>
            ) : null}
            <p>{part.data.text}</p>
          </MessageContent>
        </Message>
      );
    }

    case "data-question": {
      return (
        <Message from="user">
          <QuestionMessage
            question={part.data.question}
            answer={part.data.answer}
          />
          <MessageAvatar from="user" />
        </Message>
      );
    }

    case "data-plan": {
      return (
        <Message from="assistant">
          <MessageAvatar from="assistant" />
          <PlanningMessage data={part.data.output} />
        </Message>
      );
    }

    case "data-interruptRequestImportStrava": {
      return (
        <Message from="user">
          <RequestImportStravaDataInterrupt
            isLoading={isConnectingToStrava}
            onYes={onConfirmConnectToStrava}
            onNo={onSkipConnectToStrava}
          >
            {part.data.question}
          </RequestImportStravaDataInterrupt>
          <MessageAvatar from="user" />
        </Message>
      );
    }

    case "data-interruptSetupTrainingGoal": {
      return (
        <Message from="user">
          <SetupTrainingGoalInterrupt
            isSubmitting={isSubmittingTrainingGoal}
            title={part.data.question}
            onSubmit={onSubmitTrainingGoal}
          />
          <MessageAvatar from="user" />
        </Message>
      );
    }

    default:
      return assertNever(part);
  }
};
