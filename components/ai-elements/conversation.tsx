"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Conversation = ({
  className,
  initial = "smooth",
  resize = "smooth",
  ...props
}: React.ComponentProps<typeof StickToBottom>) => (
  <StickToBottom
    className={cn("relative h-full overflow-y-auto", className)}
    initial={initial}
    resize={resize}
    {...props}
  />
);

const ConversationContent = ({
  className,
  ...props
}: React.ComponentProps<typeof StickToBottom.Content>) => (
  <StickToBottom.Content
    className={cn("flex flex-col px-2 pb-24", className)}
    {...props}
  />
);

const ConversationScrollButton = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) {
    return null;
  }

  return (
    <Button
      className={cn(
        "absolute bottom-4 left-1/2 size-8 -translate-x-1/2 rounded-full",
        className
      )}
      onClick={() => scrollToBottom()}
      size="icon"
      type="button"
      variant="outline"
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </Button>
  );
};

export { Conversation, ConversationContent, ConversationScrollButton };
