"use client";
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({ isDark: false });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  function updateHTML(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDark(isDark);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateHTML(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateHTML(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>;
}
