"use client";

import { BotIcon, UserIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type MessageFrom = "user" | "assistant";

type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
  from: MessageFrom;
};

const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end gap-2 py-3 data-[from=user]:justify-end data-[from=assistant]:justify-start",
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
        "max-w-[88%] rounded-xl px-4 py-3 text-sm shadow-sm",
        "group-data-[from=assistant]:bg-white/90 group-data-[from=assistant]:text-slate-800",
        "group-data-[from=user]:bg-slate-900 group-data-[from=user]:text-slate-100",
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

const MessageAvatar = ({
  className,
  from,
}: {
  className?: string;
  from: MessageFrom;
}) => {
  return (
    <div
      className={cn(
        "mb-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700",
        from === "user" && "border-slate-700 bg-slate-800 text-slate-100",
        className
      )}
    >
      {from === "assistant" ? (
        <BotIcon className="size-4" />
      ) : (
        <UserIcon className="size-4" />
      )}
    </div>
  );
};

export { Message, MessageAvatar, MessageBody, MessageContent };
