"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="border-white/20 hover:border-primary/50 w-10 h-10 p-0"
      >
        <div className="h-[1.2rem] w-[1.2rem] animate-pulse bg-muted-foreground/20 rounded" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    return theme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    );
  };

  const getThemeLabel = () => {
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="border-white/20 hover:border-primary/50 transition-all duration-200 hover:scale-105 btn-glow"
      title={`Current: ${getThemeLabel()}. Click to cycle themes.`}
    >
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
