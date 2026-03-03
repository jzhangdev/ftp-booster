import { MessageContent } from "@/components/ai-elements/message";

import { MessageMotion } from "./message-motion";

interface Props {
  answer: string;
}

export const QuestionMessage = ({ answer }: Props) => {
  return (
    <MessageMotion>
      <MessageContent>{answer}</MessageContent>
    </MessageMotion>
  );
};
