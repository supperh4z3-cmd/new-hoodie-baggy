'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, Loader2 } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
}

export function AdminHeader({ onToggleSidebar, title = 'YÖNETİM PANELİ' }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-16 bg-[#0e0e13]/90 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/60"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xs font-mono font-bold tracking-widest text-zinc-100 uppercase">
            {title}
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 uppercase hidden sm:block">
            BAGGY STREET HQ CONTROL DECK
          </p>
        </div>
      </div>

      {/* Right: User Profile & Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800/80">
          <div className="w-6 h-6 bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xs font-mono font-bold">
            HQ
          </div>
          <div className="text-left">
            <span className="block text-xs font-semibold text-zinc-200 leading-tight">
              Baggy Street HQ
            </span>
            <span className="block text-[10px] font-mono text-red-400 tracking-wider">
              SUPERADMIN
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-800/50 text-xs font-mono transition-colors disabled:opacity-50"
          title="Oturumu Kapat"
        >
          {loggingOut ? (
            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          <span className="hidden md:inline">Çıkış</span>
        </button>
      </div>
    </header>
  );
}
