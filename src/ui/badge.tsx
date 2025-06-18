import { cn } from "../utils/tailwind/cn";

import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("rounded-radius transition font-semibold", {
  variants: {
    variant: {
      black: "bg-foreground text-element",
      light: "bg-neutral-200 text-black",
      border: "bg-element  border",
      red: "bg-red-500  text-neutral-200",
      green: "bg-green-500  text-black",
      yellow: "bg-yellow-400  text-black",
      ghost: "bg-transparent hover:bg-neutral-200   dark:hover:bg-neutral-700",
      link: "text-foreground underline-offset-4 hover:underline  "
    },
    size: {
      xs: "px-2 py-1 text-[10px]",
      sm: "px-2 py-1 text-xs",
      md: "px-2 py-1 text-sm"
    }
  },
  defaultVariants: {
    variant: "black",
    size: "sm"
  }
});

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Badge = ({ children, className, ref, variant, size, ...props }: ButtonProps) => {
  return (
    <div
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};
