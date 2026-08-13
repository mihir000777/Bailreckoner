import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const themeInitScript = `(function(){try{var s=localStorage.getItem('br-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("br-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="group flex items-center gap-2 rounded-sm border border-input px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {mounted && dark ? <Sun className="size-3" /> : <Moon className="size-3" />}
      <span className="hidden sm:inline">{mounted && dark ? "Light" : "Dark"}</span>
    </button>
  );
}
