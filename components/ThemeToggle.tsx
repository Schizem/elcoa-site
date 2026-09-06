"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(stored ?? (prefersDark ? "dark" : "light"));
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  // Until mount we don't know the theme; keep the label generic to match SSR.
  const label =
    theme === null
      ? "Toggle light and dark theme"
      : `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
