import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  // Exact aspect ratio of BAGGY STREET from reference visual (906 x 248)
  const sizeStyles = {
    sm: { width: 110, height: 30, className: "h-7 w-auto" },
    md: { width: 140, height: 38, className: "h-9 w-auto" },
    lg: { width: 180, height: 49, className: "h-12 w-auto" },
    xl: { width: 360, height: 98, className: "h-20 sm:h-24 md:h-28 w-auto" },
  };

  const currentSize = sizeStyles[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center group select-none ${className}`}
      aria-label="Baggy Street Anasayfa"
    >
      <Image
        src="/images/baggy-street-exact-logo.webp"
        alt="BAGGY STREET"
        width={currentSize.width}
        height={currentSize.height}
        priority={size === "xl" || size === "md"}
        className={`${currentSize.className} object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]`}
      />
    </Link>
  );
}
