"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, Shirt, Droplets, Truck } from "lucide-react";
import { ProductDetails } from "@/lib/types/ecommerce";

interface ProductAccordionProps {
  details: ProductDetails;
}

export function ProductAccordion({ details }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>("fabric");

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "fabric",
      title: "KUMAŞ & MATERYAL BİLGİSİ",
      icon: <Shirt className="w-4 h-4 text-zinc-400" />,
      content: (
        <div className="space-y-2 text-xs text-zinc-400">
          <p>
            <strong>Materyal:</strong> {details.material}
          </p>
          <p>
            <strong>Menşei:</strong> {details.origin}
          </p>
          <p className="text-zinc-500">
            Özel dokuma tekniği sayesinde tüylenme yapmaz, formunu uzun yıllar korur.
          </p>
        </div>
      ),
    },
    {
      id: "fit",
      title: "KALIP & BEDEN ÖNERİSİ",
      icon: <Sparkles className="w-4 h-4 text-zinc-400" />,
      content: (
        <div className="space-y-2 text-xs text-zinc-400">
          <p>
            <strong>Kalıp:</strong> {details.fit}
          </p>
          <p>
            Düşük omuzlu sokak silüeti için tasarlanmıştır. Standart bedeninizi aldığınızda fotoğraflardaki gibi salaş duracaktır.
          </p>
        </div>
      ),
    },
    {
      id: "care",
      title: "YIKAMA & BAKIM TALİMATI",
      icon: <Droplets className="w-4 h-4 text-zinc-400" />,
      content: (
        <div className="space-y-2 text-xs text-zinc-400">
          <p>{details.care}</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-500">
            <li>Kurutma makinesine atmayınız.</li>
            <li>Baskı/kabartma üzerine doğrudan ütü basmayınız.</li>
            <li>Benzer renklerle yıkayınız.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "TESLİMAT & KOŞULSUZ İADE",
      icon: <Truck className="w-4 h-4 text-zinc-400" />,
      content: (
        <div className="space-y-2 text-xs text-zinc-400">
          <p>
            <strong>Kargo:</strong> Siparişiniz 24 saat içinde hazırlanır ve Yurtiçi Kargo güvencesiyle 2-4 iş günü içinde teslim edilir.
          </p>
          <p>
            <strong>2.000 TL Üzeri:</strong> Tüm Türkiye&apos;ye Ücretsiz Kargo.
          </p>
          <p>
            <strong>İade & Değişim:</strong> Teslimattan itibaren 14 gün boyunca ücretsiz iade ve beden değişimi hakkınız bulunmaktadır.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-zinc-850 divide-y divide-zinc-850">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div key={section.id} className="py-3.5">
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between text-left text-xs font-mono font-bold tracking-widest uppercase text-white hover:text-red-400 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-red-500" : "text-zinc-500"
                }`}
              />
            </button>
            {isOpen && (
              <div className="pt-3 pb-1 pl-6.5 animate-in fade-in duration-200">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
