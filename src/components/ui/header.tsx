import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { SignOut } from '../app';
import { Button } from '../ui/button';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-16 border-b-4 border-border bg-bw flex justify-start items-center gap-4">
      <nav className="border-r-4 border-border h-full flex items-center px-3.5">
        <a href="/" className="border-2 border-black bg-main px-3 py-2 rounded-md text-xl font-bold flex items-center">
          <span className="hidden sm:inline">BOOKS&amp;BOOKS</span>
          <span className="sm:hidden">B&amp;B</span>
        </a>
      </nav>
      <div className="flex items-center justify-between gap-2 pr-2 w-full">
        <h1 className="text-2xl font-bold" aria-label="[Template]">
          <strong className="text-main">[Template]</strong> [Template]
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="reverse"
            size="icon"
            className="bg-bw text-text"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <SignOut />
        </div>
      </div>
    </header>
  );
};
