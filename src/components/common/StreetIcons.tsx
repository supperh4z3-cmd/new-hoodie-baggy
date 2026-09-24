"use client";

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// 1. Taktiksel Drill Hedef Göstergesi / Crosshair (Taktiksel Sokak Duruşu)
export function DrillCrosshairSvg({ size = 24, className = "text-red-500", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Köşe Taktiksel Çerçeveler */}
      <path d="M3 7V3H7" />
      <path d="M17 3H21V7" />
      <path d="M21 17V21H17" />
      <path d="M7 21H3V17" />
      {/* Merkez Daire ve Çapraz Çizgiler */}
      <circle cx="12" cy="12" r="5" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// 2. Ağır Sanayi Dikiş ve Çift İğne / 460 GSM Heavyweight Dokuma Amblemi
export function HeavyStitchSvg({ size = 24, className = "text-white", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Çift Sanayi İğnesi */}
      <path d="M4 3L8 19L9.5 22L11 19L15 3" strokeWidth="1.6" />
      <ellipse cx="7.5" cy="6" rx="1" ry="2" fill="currentColor" />
      <ellipse cx="11.5" cy="6" rx="1" ry="2" fill="currentColor" />
      {/* Zigzag Kilit Dikiş Deseni */}
      <path d="M2 13L5 11L8 13L11 11L14 13L17 11L20 13L22 11.5" strokeWidth="1.8" stroke="currentColor" />
      {/* Ağır Kumaş Katman Çizgileri */}
      <path d="M16 17H22" strokeDasharray="2 2" />
      <path d="M15 20H21" strokeDasharray="2 2" />
    </svg>
  );
}

// 3. Brutalist Jilet / Blade Streetwear Kesim Amblemi
export function RazorBladeSvg({ size = 24, className = "text-zinc-200", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Jilet Dış Gövdesi */}
      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.8" />
      {/* Jilet İç Kesim Yuvaları */}
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" />
      {/* Orta T Yuvası */}
      <path d="M9 12H15M12 9V15" strokeWidth="2" />
      <rect x="10" y="10.5" width="4" height="3" rx="0.5" strokeWidth="1" />
    </svg>
  );
}

// 4. Boxy & Drop-Shoulder Kalıp Mimari Çizimi (CAD Wireframe)
export function BoxyFitWireframeSvg({ size = 24, className = "text-white", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Geniş Dik Yaka / Kapüşon Başlangıcı */}
      <path d="M9 4C9 6 15 6 15 4" strokeWidth="1.8" />
      {/* Abartılı Düşük Omuzlar (Drop-Shoulder) */}
      <path d="M9 4L2 7.5L4 13L7 12V20H17V12L20 13L22 7.5L15 4" strokeWidth="1.6" />
      {/* Tok Gövde Dikiş Rehberi */}
      <line x1="7" y1="12" x2="17" y2="12" strokeDasharray="2 2" strokeWidth="1.2" />
      {/* Geniş Gövde Genişlik Okları */}
      <path d="M5 21H19" strokeWidth="1.8" />
      <path d="M4 19L5 21L4 23" />
      <path d="M20 19L19 21L20 23" />
    </svg>
  );
}

// 5. 14.5 OZ Japon Ham Denim Selvedge Bakır Perçin / Kırmızı Hat
export function RawSelvedgeRivetSvg({ size = 24, className = "text-amber-500", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Dış Bakır Perçin Çerçevesi */}
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="6" strokeDasharray="2 1.5" />
      {/* Kırmızı Selvedge Kenar Şeridi */}
      <rect x="11" y="5" width="2" height="14" fill="#EF4444" stroke="#EF4444" rx="0.5" />
      {/* Merkez Damga */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M3 12H5M19 12H21M12 3V5M12 19V21" strokeWidth="1.5" />
    </svg>
  );
}

// 6. Sınırlı Drop Arşiv Kasası / Numaralandırılmış Parça Kilidi
export function DropVaultLockSvg({ size = 24, className = "text-red-500", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Kasa Kilit Kelepçesi */}
      <path d="M7 10V6A5 5 0 0 1 17 6V10" strokeWidth="2" />
      {/* Ağır Metal Gövde */}
      <rect x="4" y="10" width="16" height="11" rx="2" strokeWidth="1.8" />
      {/* Dijital Drop Kodu Göstergesi */}
      <path d="M8 14H16" strokeDasharray="1.5 1.5" strokeWidth="1.5" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
      <path d="M12 18V19.5" strokeWidth="1.8" />
      {/* Köşe Güvenlik Vidaları */}
      <circle cx="6" cy="12" r="0.5" fill="currentColor" />
      <circle cx="18" cy="12" r="0.5" fill="currentColor" />
      <circle cx="6" cy="19" r="0.5" fill="currentColor" />
      <circle cx="18" cy="19" r="0.5" fill="currentColor" />
    </svg>
  );
}

// 7. Cyberpunk Sokak Navigasyon Pusulası / Çift Şehir Koordinat Amblemi
export function StreetCoordinatesSvg({ size = 24, className = "text-zinc-300", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.2" strokeDasharray="4 2" />
      {/* Pusula İğnesi */}
      <polygon points="12,3 15,12 12,10 9,12" fill="#EF4444" stroke="#EF4444" />
      <polygon points="12,21 15,12 12,14 9,12" fill="currentColor" stroke="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="#000" stroke="#FFF" strokeWidth="1" />
      {/* 4 Ana Yön Tırnakları */}
      <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" />
      <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" />
      <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" />
      <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" />
    </svg>
  );
}

// 8. Barcode & Sanayi Damgası (Brutalist Streetwear Tag)
export function BarcodeTagSvg({ size = 24, className = "text-white", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 16"
      fill="currentColor"
      className={className}
      {...props}
    >
      <rect x="0" y="0" width="2" height="16" />
      <rect x="3" y="0" width="1" height="16" />
      <rect x="6" y="0" width="3" height="16" />
      <rect x="11" y="0" width="1" height="16" />
      <rect x="13" y="0" width="2" height="16" />
      <rect x="17" y="0" width="4" height="16" />
      <rect x="23" y="0" width="1" height="16" />
      <rect x="26" y="0" width="2" height="16" />
      <rect x="30" y="0" width="2" height="16" />
    </svg>
  );
}
