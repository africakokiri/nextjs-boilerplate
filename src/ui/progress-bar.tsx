import { cn } from "../utils/tailwind/cn";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const ProgressBar = ({ value, className, ref }: ProgressBarProps) => {
  return (
    <div className="bg-element rounded-radius w-full overflow-hidden border">
      <div
        ref={ref}
        className={cn("h-4 transition-all duration-300 ease-in-out", className)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
