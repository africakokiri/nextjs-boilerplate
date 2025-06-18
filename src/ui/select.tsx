"use client";

import { cn } from "../utils/tailwind/cn";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SelectProps {
  items: {
    name: string;
    value: string;
  }[];
  className?: string;
  width?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({ items, className, width, placeholder, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={elementRef}
      className="rounded-radius focus-within:ring-offset-element focus-within:ring-foreground relative
transition focus-within:ring-2 focus-within:ring-offset-2"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          `bg-element rounded-radius hover:border-foreground relative flex w-[150px] items-center
justify-between border px-2 py-1 text-left transition`,
          className
        )}
        style={{ width }}
      >
        {selectedItem?.name || placeholder}

        {isOpen ? (
          <ChevronUpIcon className="right-0 h-4 w-4" />
        ) : (
          <ChevronDownIcon className="right-0 h-4 w-4 text-neutral-300" />
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("bg-element absolute top-10 right-0 w-[150px] rounded-md border p-1")}
          style={{ width }}
        >
          {items.map(({ name, value }) => {
            return (
              <div
                key={`${name}-${value}`}
                onClick={() => {
                  onChange(value);
                  setIsOpen(false);
                }}
                className="bg-element cursor-pointer rounded-md p-2 py-1.5 hover:bg-neutral-100
dark:hover:bg-neutral-700"
              >
                {name}
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
