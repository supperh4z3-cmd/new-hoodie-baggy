import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8 md:h-9",
    lg: "h-11 md:h-12",
    xl: "h-14 md:h-16",
  };

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center justify-center group tracking-tighter select-none ${className}`}
      aria-label="Baggy Street Anasayfa"
    >
      {/* Authentic Graffiti / Street Wordmark */}
      <svg
        className={`${sizeClasses[size]} w-auto text-white transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 280 62"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* BAGGY text in raw, aggressive street graffiti style */}
        <g id="BAGGY" className="fill-white">
          {/* B */}
          <path d="M 12 6 L 36 6 Q 48 6 48 16 Q 48 21 42 24 Q 50 27 50 38 Q 50 50 36 50 L 12 50 Z M 22 14 L 22 23 L 34 23 Q 40 23 40 18 Q 40 14 34 14 Z M 22 31 L 22 42 L 35 42 Q 42 42 42 36 Q 42 31 35 31 Z" />
          {/* A */}
          <path d="M 66 6 L 79 6 L 96 50 L 85 50 L 81 38 L 64 38 L 60 50 L 50 50 Z M 67 29 L 78 29 L 72.5 14 Z" />
          {/* G */}
          <path d="M 132 16 L 124 22 Q 119 14 112 14 Q 102 14 102 28 Q 102 42 113 42 Q 120 42 124 36 L 124 32 L 114 32 L 114 24 L 134 24 L 134 40 Q 126 50 112 50 Q 92 50 92 28 Q 92 6 112 6 Q 124 6 132 16 Z" />
          {/* G */}
          <path d="M 178 16 L 170 22 Q 165 14 158 14 Q 148 14 148 28 Q 148 42 159 42 Q 166 42 170 36 L 170 32 L 160 32 L 160 24 L 180 24 L 180 40 Q 172 50 158 50 Q 138 50 138 28 Q 138 6 158 6 Q 170 6 178 16 Z" />
          {/* Y */}
          <path d="M 188 6 L 199 6 L 208 26 L 217 6 L 228 6 L 214 33 L 214 50 L 202 50 L 202 33 Z" />
        </g>

        {/* STREET sub-banner in street stencil/chiseled typography */}
        <text
          x="120"
          y="60"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Impact, sans-serif"
          fontSize="11"
          letterSpacing="0.45em"
          className="opacity-90 font-black"
        >
          STREET
        </text>
      </svg>
    </Link>
  );
}
