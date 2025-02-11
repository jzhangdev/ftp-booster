import { NextResponse } from "next/server";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

export const POST = async (request: Request) => {
  const data = await request.json();
  const prompt = await hub.pull("cyclist-ftp-booster");
  const model = new ChatOpenAI({
    model: "gpt-4o",
  });
  const output = await prompt.pipe(model).invoke(data);

  return NextResponse.json(output);
};
