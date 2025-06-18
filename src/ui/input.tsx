import { cn } from "../utils/tailwind/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPrimary?: boolean;
  className?: string;
}

export const Input = ({ isPrimary, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        `rounded-radius bg-element hover:border-foreground focus-within:ring-offset-element
focus-within:ring-foreground border px-2 py-1 transition outline-none focus-within:ring-2
focus-within:ring-offset-2`,
        isPrimary && "focus-within:ring-primary hover:border-primary",
        className
      )}
      {...props}
    />
  );
};
