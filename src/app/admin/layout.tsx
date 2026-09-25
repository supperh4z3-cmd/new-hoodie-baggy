'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render clean layout without sidebar & header
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#08080b] text-zinc-100 flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  // Derive dynamic header title from pathname
  let pageTitle = 'DASHBOARD';
  if (pathname?.startsWith('/admin/orders')) {
    pageTitle = 'SİPARİŞ & KARGO YÖNETİMİ';
  } else if (pathname?.startsWith('/admin/products')) {
    pageTitle = 'ÜRÜN & STOK KATALOĞU';
  } else if (pathname?.startsWith('/admin/coupons')) {
    pageTitle = 'İNDİRİM KUPONLARI';
  } else if (pathname?.startsWith('/admin/content')) {
    pageTitle = 'SİTE İÇERİK YÖNETİMİ (CMS)';
  }

  return (
    <div className="min-h-screen bg-[#09090c] text-zinc-100 flex font-sans">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 min-h-screen">
        <AdminHeader
          title={pageTitle}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
