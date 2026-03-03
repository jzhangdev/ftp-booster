"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MessageFrom = "user" | "assistant";

type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
  from: MessageFrom;
};

const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full py-2 data-[from=user]:justify-end data-[from=assistant]:justify-start",
      className
    )}
    data-from={from}
    {...props}
  />
);

const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        "max-w-[92%] rounded-[1.5rem] border border-slate-200/90 bg-slate-100/95 px-7 py-5 text-xl leading-tight text-slate-700 shadow-[0_2px_12px_rgba(15,23,42,0.06)]",
        className
      )}
    />
  )
);
MessageContent.displayName = "MessageContent";

const MessageBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn("max-w-[88%]", className)}
    />
  )
);
MessageBody.displayName = "MessageBody";

export { Message, MessageBody, MessageContent };
