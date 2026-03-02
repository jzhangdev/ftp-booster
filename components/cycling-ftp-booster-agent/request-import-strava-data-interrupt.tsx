import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { MessageMotion } from "./message-motion";

interface Props {
  isLoading: boolean;
  onYes: () => void;
  onNo: () => void;
}

export const RequestImportStravaDataInterrupt = ({
  isLoading,
  onYes,
  onNo,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <MessageMotion>
      <Card className="max-w-3xl border-sky-300/70 bg-sky-50/90 backdrop-blur-sm">
        <CardContent className="space-y-3 p-4 text-sm text-slate-700">
          <p>{children}</p>
          <div className="flex items-center gap-2">
            <Button variant="default" onClick={onYes} disabled={isLoading}>
              Yes
            </Button>
            <Button variant="outline" onClick={onNo} disabled={isLoading}>
              No
            </Button>
          </div>
        </CardContent>
      </Card>
    </MessageMotion>
  );
};
