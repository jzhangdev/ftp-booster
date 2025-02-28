import { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import {
  Annotation,
  interrupt,
  MemorySaver,
  messagesStateReducer,
  StateGraph,
} from "@langchain/langgraph";
import {
  AIMessage,
  BaseMessage,
  SystemMessage,
  HumanMessage,
} from "@langchain/core/messages";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
  }),
  trainingGoal: Annotation<CyclingFtpBoosterFormSchema>(),
  isStravaDataImported: Annotation<boolean>(),
  activities: Annotation<unknown[] | null>(),
});

const setupTrainingGoalTipsNode = (state: typeof StateAnnotation.State) => {
  const messages = state.messages || [];
  return {
    messages: [
      ...messages,
      new SystemMessage({
        content:
          "Welcome to FTP Booster! We offer personalized cycling training plans tailored to your preferences, helping you enhance your performance and reach your cycling goals.",
      }),
    ],
  };
};

const setupTrainingGoalNode = async () => {
  const value = interrupt({
    type: "setupTrainingGoal",
    question: "Enter your training goals:",
  });

  return {
    messages: [
      new HumanMessage({
        content: [
          {
            type: "question",
            question: "Setup training goal.",
            answer: `Want to increase FTP from ${value.current}W to ${value.target}W by training ${value.hoursOfDay} hours a day, ${value.daysOfWeek} days a week.`,
          },
        ],
      }),
    ],
    trainingGoal: value,
  };
};

const callCyclingFtpBoosterPromptNode = async (
  state: typeof StateAnnotation.State
) => {
  const input = state.trainingGoal;
  const prompt = await hub.pull("cycling-ftp-booster");
  const model = new ChatOpenAI({
    model: "gpt-4o",
  });
  const output = await prompt.pipe(model).invoke({
    ...input,
    activities: state.isStravaDataImported ? state.activities : null,
  });

  return {
    messages: [
      new AIMessage({
        content: [
          {
            type: "planning",
            output,
          },
        ],
      }),
    ],
  };
};

const requestImportStravaDataNode = (state: typeof StateAnnotation.State) => {
  const question =
    "Connecting to Strava will enhance planning accuracy.Would you like to link your Strava activities?";
  const { value: isStravaDataImported, activities } = interrupt({
    type: "requestImportStravaData",
    question,
  });

  state.messages.push(
    new HumanMessage({
      content: [
        {
          type: "question",
          question,
          answer: isStravaDataImported ? "Yes" : "No",
        },
      ],
    })
  );

  if (isStravaDataImported) {
    state.messages.push(
      new AIMessage({
        content: [
          {
            type: "text",
            text: `${activities.length} ride activities imported from Strava.`,
          },
        ],
      })
    );
  }

  return {
    isStravaDataImported,
    activities: activities ? activities : null,
  };
};

const checkpointer = new MemorySaver();

export const graph = new StateGraph(StateAnnotation)
  .addNode("setupTrainingGoalTipsNode", setupTrainingGoalTipsNode)
  .addNode("setupTrainingGoalNode", setupTrainingGoalNode)
  .addNode("callCyclingFtpBoosterPromptNode", callCyclingFtpBoosterPromptNode)
  .addNode("requestImportStravaDataNode", requestImportStravaDataNode)
  .addEdge("__start__", "setupTrainingGoalTipsNode")
  .addEdge("setupTrainingGoalTipsNode", "requestImportStravaDataNode")
  .addEdge("requestImportStravaDataNode", "setupTrainingGoalNode")
  .addEdge("setupTrainingGoalNode", "callCyclingFtpBoosterPromptNode")
  .addEdge("callCyclingFtpBoosterPromptNode", "__end__")
  .compile({ checkpointer });
