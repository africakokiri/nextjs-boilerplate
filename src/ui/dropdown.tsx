"use client";

import { cn } from "../utils/tailwind/cn";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  containerClassName?: string;
  items: {
    name: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dropdown = ({
  trigger,
  containerClassName,
  items,
  onChange,
  open,
  onOpenChange
}: DropdownProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  return (
    <div
      ref={elementRef}
      className="relative"
    >
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-element absolute top-12 right-0 w-24 rounded-md border p-1",
            containerClassName
          )}
        >
          {items.map(({ name, value }) => (
            <div
              key={`${name}-${value}`}
              onClick={() => {
                onChange(value);
                onOpenChange(false);
              }}
              className="bg-element cursor-pointer rounded-md p-2 py-1.5 hover:bg-neutral-100
dark:hover:bg-neutral-700"
            >
              {name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
