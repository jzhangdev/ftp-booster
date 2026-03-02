import type { UIMessage } from "ai";

import type { CyclingFtpBoosterPlan } from "@/types/plan";

export interface FtpMessageMetadata {
  source: "langgraph";
  originalRole?: string;
}

export type FtpDataParts = {
  status: {
    kind: "system" | "assistant";
    text: string;
  };
  question: {
    question: string;
    answer: string;
  };
  plan: {
    output: CyclingFtpBoosterPlan;
  };
  interruptRequestImportStrava: {
    question: string;
  };
  interruptSetupTrainingGoal: {
    question: string;
  };
};

export type FtpUIMessage = UIMessage<FtpMessageMetadata, FtpDataParts, never>;
