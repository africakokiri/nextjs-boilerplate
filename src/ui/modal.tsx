"use client";

import { Button } from "../ui/button";
import { cn } from "../utils/tailwind/cn";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type HTMLAttributes, useEffect, useRef, useState } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

export const Modal = ({ children, className, trigger, title, description }: ModalProps) => {
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
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>{trigger}</Button>

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
                    onClick={() => setIsOpen(false)}
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
