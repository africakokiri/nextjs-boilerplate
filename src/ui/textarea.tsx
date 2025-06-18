"use client";

import { cn } from "@/utils/tailwind/cn";

import { forwardRef } from "react";
import TextareaAutosize, { type TextareaAutosizeProps } from "react-textarea-autosize";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          `rounded-radius bg-element hover:border-foreground focus-within:ring-offset-element
focus-within:ring-foreground resize-none border px-2 py-1 transition outline-none focus-within:ring-2
focus-within:ring-offset-2`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
