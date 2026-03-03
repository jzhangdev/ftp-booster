import type { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import type { FtpUIMessage } from "@/types/chat-message";

import { Message, MessageContent } from "@/components/ai-elements/message";
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
          <MessageContent
            className={
              part.data.kind === "system"
                ? "border-slate-200 bg-slate-100 text-slate-700"
                : undefined
            }
          >
            <p>{part.data.text}</p>
          </MessageContent>
        </Message>
      );
    }

    case "data-question": {
      return (
        <Message from="user">
          <QuestionMessage answer={part.data.answer} />
        </Message>
      );
    }

    case "data-plan": {
      return (
        <Message from="assistant">
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
        </Message>
      );
    }

    default:
      return assertNever(part);
  }
};
