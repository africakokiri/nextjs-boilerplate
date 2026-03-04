import { inter } from "@shared/styles";
import "@shared/styles/globals.css";

import { ReactNode } from "react";

import { cn } from "cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ""
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>{children}</body>
    </html>
  );
}
