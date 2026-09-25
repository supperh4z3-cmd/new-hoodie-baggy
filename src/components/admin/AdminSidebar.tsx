'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PackageCheck,
  Shirt,
  TicketPercent,
  SlidersHorizontal,
  ExternalLink,
  X,
  ShieldAlert,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Siparişler',
    href: '/admin/orders',
    icon: PackageCheck,
    exact: false,
  },
  {
    name: 'Ürün & Stok',
    href: '/admin/products',
    icon: Shirt,
    exact: false,
  },
  {
    name: 'Kupon Yönetimi',
    href: '/admin/coupons',
    icon: TicketPercent,
    exact: false,
  },
  {
    name: 'Site İçerikleri (CMS)',
    href: '/admin/content',
    icon: SlidersHorizontal,
    exact: false,
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0e0e13] border-r border-zinc-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-black text-black tracking-tighter text-sm rounded-none">
              BG
            </div>
            <div>
              <span className="font-extrabold tracking-widest text-sm text-white block">
                BAGGY STREET
              </span>
              <span className="text-[10px] font-mono tracking-wider text-red-400 uppercase">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white"
            aria-label="Menüyü Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Status Pill */}
        <div className="px-6 py-4 border-b border-zinc-800/40">
          <div className="flex items-center justify-between text-xs px-3 py-2 bg-zinc-900/80 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-300 font-mono text-[11px]">SİSTEM AKTİF</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">v1.0-SQLITE</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 border-l-2 ${
                  isActive
                    ? 'bg-red-500/10 text-red-400 border-red-500 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-zinc-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Storefront Link & Footer */}
        <div className="p-4 border-t border-zinc-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              <span>Mağazayı Gör</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">↗</span>
          </Link>

          <div className="flex items-center gap-2 px-2 text-[10px] text-zinc-500 font-mono">
            <ShieldAlert className="w-3 h-3 text-red-500" />
            <span>Baggy Security Protocol 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
}
