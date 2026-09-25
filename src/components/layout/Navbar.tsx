"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, User, ShoppingBag, X, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const openCart = useCartStore((state) => state.openCart);
  const totalItemCount = useCartStore((state) => state.getTotalItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "KOLEKSİYON", href: "/shop" },
    { name: "LOOKBOOK", href: "/editorial" },
    { name: "HİKAYEMİZ", href: "/about" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-2xl"
            : "bg-black/60 backdrop-blur-md py-4 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav (Desktop) / Hamburger (Mobile) */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-zinc-300 hover:text-white transition-colors lg:hidden rounded-md"
                aria-label="Menüyü Aç"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-xs tracking-widest font-semibold uppercase transition-colors relative py-1 ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Graffiti Logo */}
            <div className="flex-1 flex justify-center">
              <Logo size="md" />
            </div>

            {/* Right Icons: Search, Account, Cart */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-zinc-300 hover:text-white transition-colors relative"
                aria-label="Arama"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-zinc-300 hover:text-white transition-colors relative flex items-center group"
                aria-label={`Favoriler (${wishlistCount})`}
              >
                <Heart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-bold text-white bg-red-600 rounded-full transition-transform group-hover:scale-105">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                href="/shop"
                className="p-2 text-zinc-300 hover:text-white transition-colors hidden sm:inline-flex"
                aria-label="Hesap"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Trigger Button */}
              <button
                type="button"
                onClick={openCart}
                className="p-2 text-zinc-300 hover:text-white transition-colors relative flex items-center gap-1 group"
                aria-label={`Sepet (${totalItemCount} ürün)`}
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-black bg-white rounded-full transition-transform group-hover:scale-105">
                  {totalItemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950/95 py-4 px-4 sm:px-6 transition-all animate-in fade-in slide-in-from-top-2">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Drill hoodie, sweatpants, jean ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <Link
                href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                onClick={() => setSearchOpen(false)}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded uppercase font-mono tracking-wider"
              >
                ARA
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
