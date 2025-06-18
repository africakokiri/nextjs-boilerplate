"use client";

import { cn } from "../utils/tailwind/cn";

import { motion } from "framer-motion";
import { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({ checked: controlledChecked, onChange, disabled, className }: SwitchProps) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const toggle = () => {
    if (disabled) return;
    const newState = !checked;
    if (!isControlled) setUncontrolledChecked(newState);
    onChange?.(newState);
  };

  return (
    <button
      onClick={toggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
        checked ? "bg-foreground" : "bg-neutral-200",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "h-4 w-4 rounded-full bg-white shadow-md",
          "absolute left-1",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
};
