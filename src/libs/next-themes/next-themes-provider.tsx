"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export default function NextThemesProvider({
  children
}: {
  readonly children: ReactNode;
}) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
}
