"use client";

import { useEffect, useState } from "react";
import { GitHubLink } from "./github-link";
import { Logo } from "./logo";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-[1320px]">
        <div
          className={`flex h-16 items-center justify-between border-x border-b px-6 transition-colors duration-200 ${
            scrolled
              ? "border-x-(--l-border) border-b-(--l-border) bg-(--l-nav-bg) backdrop-blur-sm"
              : "border-x-transparent border-b-transparent bg-transparent"
          }`}
        >
          <Logo className="h-[17px]" />

          <GitHubLink />
        </div>
      </div>
    </nav>
  );
}
