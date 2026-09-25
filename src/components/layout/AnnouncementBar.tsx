"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  DEFAULT_ANNOUNCEMENT_BAR,
  AnnouncementBarContent,
} from "@/lib/contentDefaults";

export function AnnouncementBar() {
  const [bar, setBar] = useState<AnnouncementBarContent>(DEFAULT_ANNOUNCEMENT_BAR);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.settings?.announcement_bar) {
          setBar(data.settings.announcement_bar);
        }
      })
      .catch((err) => console.warn("AnnouncementBar content fetch fallback:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (!bar.enabled) return null;

  return (
    <div className="relative z-40 bg-zinc-950 border-b border-zinc-800/80 text-zinc-300 text-xs py-2 px-4 overflow-hidden select-none">
      <div className="flex items-center justify-center gap-3 tracking-widest text-[11px] font-medium uppercase text-center">
        <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse hidden sm:inline-block" />
        <span>{bar.text}</span>
        {bar.subtext && (
          <>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="hidden md:inline text-zinc-400">{bar.subtext}</span>
          </>
        )}
        {bar.linkText && bar.linkUrl && (
          <>
            <span className="text-zinc-600 hidden lg:inline">•</span>
            <Link
              href={bar.linkUrl}
              className="text-white hover:text-red-400 underline underline-offset-4 decoration-zinc-600 hover:decoration-red-400 transition-colors ml-1 font-semibold"
            >
              {bar.linkText}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
