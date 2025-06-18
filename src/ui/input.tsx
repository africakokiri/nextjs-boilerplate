import { cn } from "../utils/tailwind/cn";

import { type HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  isPrimary?: boolean;
}

export const Input = ({ isPrimary, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        `rounded-radius bg-element hover:border-foreground focus-within:ring-offset-element
focus-within:ring-foreground border px-2 py-1 transition outline-none focus-within:ring-2
focus-within:ring-offset-2`,
        isPrimary && "focus-within:ring-primary hover:border-primary"
      )}
      {...props}
    />
  );
};
