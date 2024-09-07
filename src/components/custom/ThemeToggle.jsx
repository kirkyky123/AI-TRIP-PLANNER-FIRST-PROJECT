import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="bg-transparent dark:border-black hover:bg-gray-100 dark:hover:bg-gray-900 border-gray-700 border-2 rounded-xl hover:scale-105 transition-all">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black dark:text-dark-foreground" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-light-foreground dark:text-dark-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}