import { cn } from "../utils/tailwind/cn";

import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer rounded-radius transition hover:ring-2 hover:ring-offset-2 hover:ring-offset-background font-semibold",
  {
    variants: {
      variant: {
        black: "bg-foreground text-element hover:ring-foreground",
        light: "bg-neutral-200 hover:ring-neutral-200 text-black",
        border: "bg-element hover:ring-border border",
        red: "bg-red-500 hover:ring-red-500 text-neutral-200",
        green: "bg-green-500 hover:ring-green-500 text-black",
        yellow: "bg-yellow-400 hover:ring-yellow-400 text-black",
        ghost:
          "bg-transparent hover:bg-neutral-200 hover:ring-offset-0 hover:ring-0 dark:hover:bg-neutral-700",
        link: "text-foreground underline-offset-4 hover:underline hover:ring-offset-0 hover:ring-0"
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-2 py-1 text-sm ",
        md: "px-3 py-1.5 text-base",
        lg: "px-4 py-2 text-lg",
        xl: "px-6 py-3 text-xl",
        icon: "flex items-center justify-center p-2"
      }
    },
    defaultVariants: {
      variant: "black",
      size: "md"
    }
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = ({ children, className, ref, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
