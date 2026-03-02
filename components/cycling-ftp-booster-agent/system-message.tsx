import { PropsWithChildren } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { MessageMotion } from "./message-motion";

export const SystemMessage = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MessageMotion>
      <Card className="max-w-3xl border-amber-200/70 bg-amber-50/80 backdrop-blur-sm">
        <CardContent className="space-y-2 p-4 text-sm leading-6 text-slate-700">
          <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-900">
            System
          </Badge>
          <div>{children}</div>
        </CardContent>
      </Card>
    </MessageMotion>
  );
};
