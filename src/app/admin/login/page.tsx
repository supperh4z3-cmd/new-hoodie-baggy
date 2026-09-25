'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Loader2,
} from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail('admin@baggystreet.com');
    setPassword('baggystreet2026!');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Giriş yapılamadı.');
      }

      // Successful login, navigate to destination
      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 font-black text-black text-xl mb-4 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
          BG
        </div>
        <h1 className="text-xl font-mono font-black tracking-widest text-white uppercase">
          BAGGY STREET // CONTROL
        </h1>
        <p className="text-xs font-mono text-zinc-500 uppercase mt-1 tracking-wider">
          Yetkili Yönetici Giriş Terminali
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[#121218] border border-zinc-800 p-6 sm:p-8 shadow-2xl relative">
        {/* Top Crimson Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        {/* Demo Fast-Fill Banner */}
        <div className="mb-6 p-3 bg-zinc-900/90 border border-dashed border-red-500/40 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-zinc-300">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> TEST GİRİŞ BİLGİSİ:
            </span>
            <span className="text-zinc-400 block mt-0.5">admin@baggystreet.com</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 text-[10px] font-mono uppercase font-bold tracking-wider transition-colors shrink-0"
          >
            Otomatik Doldur
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/80 flex items-start gap-3 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="font-mono">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Yönetici E-Posta
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@baggystreet.com"
                className="w-full bg-[#0a0a0e] border border-zinc-700/80 pl-10 pr-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500 font-mono transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0a0a0e] border border-zinc-700/80 pl-10 pr-10 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500 font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-red-600 hover:bg-red-500 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>DOĞRULANIYOR...</span>
              </>
            ) : (
              <>
                <span>GİRİŞ YAP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-bit JWT Safe
          </span>
          <Link
            href="/"
            className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
          >
            ← Mağazaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-zinc-500 font-mono text-xs">Yükleniyor...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
