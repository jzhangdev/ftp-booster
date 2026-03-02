import { PropsWithChildren } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { MessageMotion } from "./message-motion";

export const AiMessage = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MessageMotion>
      <Card className="max-w-3xl border-sky-200/70 bg-white/85 backdrop-blur-sm">
        <CardContent className="p-4 text-sm leading-6 text-slate-700">{children}</CardContent>
      </Card>
    </MessageMotion>
  );
};
