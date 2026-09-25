import Link from "next/link";
import { ShoppingBag, Home } from "lucide-react";
import { DrillCrosshairSvg, RazorBladeSvg } from "@/components/common/StreetIcons";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[#050508] text-white relative overflow-hidden text-center select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-red-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Brand Stamp */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <DrillCrosshairSvg size={20} className="text-red-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-black">
            BAGGY STREET // 404 ERROR ARCHIVE
          </span>
        </div>

        {/* 404 Big Brutalist Typography */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-white uppercase leading-none select-none">
            404
          </h1>
          <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-900/60 px-3 py-1 rounded-full text-xs font-mono text-red-400 uppercase font-black -rotate-2 mt-2">
            <RazorBladeSvg size={14} className="text-red-400" />
            <span>DROPPED OUT OF SIGHT</span>
          </div>
        </div>

        {/* Subtitle Message */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-mono">
            ARADIĞIN SOKAK VEYA DROP BULUNAMADI
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed max-w-md mx-auto">
            Ulaşmaya çalıştığın parça ya tükendi ya da henüz underground atölyelerimizden çıkış yapmadı.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-black px-6 py-3.5 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-xl shadow-white/10"
          >
            <Home className="w-4 h-4" />
            <span>ANASAYFAYA DÖN</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-bold px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 uppercase tracking-widest transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4 text-red-500" />
            <span>TÜM DROPLARI İNCELE</span>
          </Link>
        </div>

        {/* Footer Coordinate Accent */}
        <div className="pt-8 text-[11px] font-mono text-zinc-600">
          41.0082° N, 28.9784° E // KADIKÖY ATÖLYE & İSTANBUL
        </div>
      </div>
    </div>
  );
}
