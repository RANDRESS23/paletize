import { Palette } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto max-w-4xl">
        <div className="hidden md:flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-500" />
          <p className="text-sm text-muted-foreground">© 2025 Paletize</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Hecho con <span className="text-red-500 mx-0.5">❤</span> por{" "}
          <Link
            href="https://www.linkedin.com/in/raul-quimbaya/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Raúl Quimbaya
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <Palette className="h-5 w-5 text-purple-500" />
          <p className="text-sm text-muted-foreground">© 2025 Paletize</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/RANDRESS23/paletize"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};
