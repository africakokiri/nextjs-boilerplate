"use client";

import { cn } from "../utils/tailwind/cn";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  children,
  className,
  trigger,
  title,
  description,
  open,
  onOpenChange
}: ModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const elementRef = useRef<HTMLDivElement>(null);

  const handleSetOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
        handleSetOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div onClick={() => handleSetOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-element/50 absolute top-0 left-0 flex h-screen w-screen items-center
justify-center backdrop-blur-xs"
          >
            <div
              ref={elementRef}
              className={cn("rounded-radius bg-element h-fit w-fit space-y-4 border p-4", className)}
            >
              <div className="space-y-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-xl font-bold">{title}</p>
                  <XIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => handleSetOpen(false)}
                  />
                </div>
                <p className="text-sm text-neutral-500">{description}</p>
              </div>
              <div>{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
