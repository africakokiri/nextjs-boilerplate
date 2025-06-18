"use client";

import { Button, type ButtonVariant } from "../ui/button";
import { cn } from "../utils/tailwind/cn";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  children: React.ReactNode;
  buttonClassName?: string;
  containerClassName?: string;
  items: {
    name: string;
    value: string;
  }[];
  buttonVariant?: ButtonVariant;
  onChange: (value: string) => void;
}

export const Dropdown = ({
  children,
  buttonClassName,
  containerClassName,
  items,
  buttonVariant,
  onChange
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

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
      className="relative"
    >
      <Button
        size="icon"
        variant={buttonVariant}
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClassName}
      >
        {children}
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-element absolute top-12 right-0 w-24 rounded-md border p-1",
            containerClassName
          )}
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
