"use client";

import React from "react";
import { useToastStore } from "@/lib/store/useToastStore";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success" || !toast.type;
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-lg border backdrop-blur-md shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? "bg-zinc-950/95 border-emerald-500/40 text-white"
                : isError
                ? "bg-zinc-950/95 border-red-500/40 text-white"
                : "bg-zinc-950/95 border-zinc-800 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
              <span className="text-xs font-mono tracking-wide">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white p-1"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
