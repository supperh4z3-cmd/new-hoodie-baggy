import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ToastContainer } from "@/components/ui/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BAGGY STREET | Istanbul & Amsterdam Streetwear / Drill Culture",
  description: "Amsterdam kesimlerinden ve İstanbul sokaklarından ilham alan ağır gramajlı kapüşonlular, baggy sweatpants ve vintage denim koleksiyonları.",
  keywords: ["streetwear", "baggy street", "drill hoodie", "baggy sweatpants", "wide leg jeans", "istanbul drill"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-[#FAFAFA]">
        <StorefrontShell>{children}</StorefrontShell>
        <ToastContainer />
      </body>
    </html>
  );
}
