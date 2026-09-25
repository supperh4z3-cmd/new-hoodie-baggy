import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';
import {
  DEFAULT_HERO_SLIDES,
  DEFAULT_ANNOUNCEMENT_BAR,
  DEFAULT_EDITORIAL_LOOKS,
  DEFAULT_BRAND_STORY,
} from '@/lib/contentDefaults';

const VALID_SETTING_KEYS = new Set([
  'hero_slides',
  'announcement_bar',
  'editorial_looks',
  'brand_story',
]);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim. Lütfen admin girişi yapınız.' },
        { status: 401 }
      );
    }

    const dbSettings = await prisma.siteSetting.findMany();
    const map = new Map<string, string>();
    for (const s of dbSettings) {
      map.set(s.key, s.value);
    }

    const parseOrDefault = (key: string, fallback: unknown) => {
      if (!map.has(key)) return fallback;
      try {
        return JSON.parse(map.get(key)!);
      } catch {
        return fallback;
      }
    };

    return NextResponse.json({
      success: true,
      settings: {
        hero_slides: parseOrDefault('hero_slides', DEFAULT_HERO_SLIDES),
        announcement_bar: parseOrDefault('announcement_bar', DEFAULT_ANNOUNCEMENT_BAR),
        editorial_looks: parseOrDefault('editorial_looks', DEFAULT_EDITORIAL_LOOKS),
        brand_story: parseOrDefault('brand_story', DEFAULT_BRAND_STORY),
      },
    });
  } catch (error) {
    console.error('Admin content GET error:', error);
    return NextResponse.json(
      { error: 'İçerik ayarları yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim. Lütfen admin girişi yapınız.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key || !VALID_SETTING_KEYS.has(key)) {
      return NextResponse.json(
        { error: `Geçersiz ayar anahtarı: ${key}. İzin verilenler: ${Array.from(VALID_SETTING_KEYS).join(', ')}` },
        { status: 400 }
      );
    }

    if (value === undefined || value === null) {
      return NextResponse.json(
        { error: 'Ayar değeri (value) boş olamaz.' },
        { status: 400 }
      );
    }

    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);

    const saved = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: serializedValue },
      create: { key, value: serializedValue },
    });

    return NextResponse.json({
      success: true,
      message: `${key} ayarı başarıyla güncellendi.`,
      setting: {
        key: saved.key,
        value: typeof value === 'string' ? JSON.parse(value) : value,
        updatedAt: saved.updatedAt,
      },
    });
  } catch (error) {
    console.error('Admin content PUT error:', error);
    return NextResponse.json(
      { error: 'Ayar kaydedilirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
