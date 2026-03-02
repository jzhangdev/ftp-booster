import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { MessageMotion } from "./message-motion";

interface Props {
  question: string;
  answer: string;
}

export const QuestionMessage = ({ question, answer }: Props) => {
  return (
    <MessageMotion>
      <Card className="max-w-3xl border-slate-300/80 bg-slate-900 text-slate-100">
        <CardContent className="space-y-3 p-4 text-sm">
          <Badge className="w-fit bg-sky-500 text-white">Your Input</Badge>
          <p className="text-slate-200">
            <span className="font-semibold text-white">Question:</span> {question}
          </p>
          <p className="text-slate-200">
            <span className="font-semibold text-white">Answer:</span> {answer}
          </p>
        </CardContent>
      </Card>
    </MessageMotion>
  );
};
