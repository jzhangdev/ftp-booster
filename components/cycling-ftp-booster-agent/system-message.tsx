import { PropsWithChildren } from "react";

import { Message, MessageContent } from "@/components/ai-elements/message";

import { MessageMotion } from "./message-motion";

export const SystemMessage = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MessageMotion>
      <Message from="assistant">
        <MessageContent>{children}</MessageContent>
      </Message>
    </MessageMotion>
  );
};
