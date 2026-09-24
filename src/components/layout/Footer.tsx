"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowRight, Check } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, YoutubeIcon, SpotifyIcon } from "./SocialIcons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-850 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          {/* Col 1: Logo & Manifesto (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="lg" />
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Amsterdam&apos;ın özgür ruhundan ve İstanbul sokaklarının dinamik drill kültüründen ilham alan premium streetwear markası. Ağır kumaşlar, tavizsiz oversize kalıplar.
            </p>
            <div className="text-[11px] font-mono tracking-widest text-zinc-500">
              41.0082° N, 28.9784° E ISTANBUL / TURKEY
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              MENÜ
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  SHOP (TÜM ÜRÜNLER)
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="hover:text-white transition-colors text-red-400 font-semibold">
                  LOOKBOOK (EDİTORYAL)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  OUR STORY (HAKKIMIZDA)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hoodies" className="hover:text-white transition-colors">
                  KAPÜŞONLU & HOODIE
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sweatpants" className="hover:text-white transition-colors">
                  BAGGY EŞOFMAN
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jeans" className="hover:text-white transition-colors">
                  DENIM & JEANS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              JOIN OUR NEWSLETTER
            </h4>
            <p className="text-xs text-zinc-500">
              Yeni drop&apos;lardan, gizli indirimlerden ve sınırlı sayıda üretilen parçalardan ilk sen haberdar ol.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md">
              <input
                type="email"
                required
                placeholder="E-posta adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border-b border-zinc-700 py-3 pr-10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Bültene Kaydol"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ Teşekkürler! Drop listesine eklendiniz.
              </p>
            )}

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-5 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-950 border border-zinc-800 rounded-full hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-950 border border-zinc-800 rounded-full hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-zinc-950 border border-zinc-800 rounded-full hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-4">
          <div>
            © {new Date().getFullYear()} Baggy Street. All rights reserved. Designed for Istanbul Streets.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-zinc-400 transition-colors">
              Terms & Conditions
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 border border-zinc-800 rounded-full hover:border-zinc-600 hover:text-white transition-colors ml-4"
              aria-label="Sayfanın Başına Çık"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
