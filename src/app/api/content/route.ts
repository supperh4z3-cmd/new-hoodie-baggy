import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  DEFAULT_HERO_SLIDES,
  DEFAULT_ANNOUNCEMENT_BAR,
  DEFAULT_EDITORIAL_LOOKS,
  DEFAULT_BRAND_STORY,
} from '@/lib/contentDefaults';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = new Map<string, string>();
    for (const item of settings) {
      settingsMap.set(item.key, item.value);
    }

    // Hero Slides
    let heroSlides = DEFAULT_HERO_SLIDES;
    if (settingsMap.has('hero_slides')) {
      try {
        const parsed = JSON.parse(settingsMap.get('hero_slides')!);
        if (Array.isArray(parsed) && parsed.length > 0) {
          heroSlides = parsed;
        }
      } catch (err) {
        console.warn('Failed to parse hero_slides from DB:', err);
      }
    }

    // Announcement Bar
    let announcementBar = DEFAULT_ANNOUNCEMENT_BAR;
    if (settingsMap.has('announcement_bar')) {
      try {
        const parsed = JSON.parse(settingsMap.get('announcement_bar')!);
        if (parsed && typeof parsed === 'object') {
          announcementBar = { ...DEFAULT_ANNOUNCEMENT_BAR, ...parsed };
        }
      } catch (err) {
        console.warn('Failed to parse announcement_bar from DB:', err);
      }
    }

    // Editorial Looks
    let editorialLooks = DEFAULT_EDITORIAL_LOOKS;
    if (settingsMap.has('editorial_looks')) {
      try {
        const parsed = JSON.parse(settingsMap.get('editorial_looks')!);
        if (Array.isArray(parsed) && parsed.length > 0) {
          editorialLooks = parsed;
        }
      } catch (err) {
        console.warn('Failed to parse editorial_looks from DB:', err);
      }
    }

    // Brand Story
    let brandStory = DEFAULT_BRAND_STORY;
    if (settingsMap.has('brand_story')) {
      try {
        const parsed = JSON.parse(settingsMap.get('brand_story')!);
        if (parsed && typeof parsed === 'object') {
          brandStory = { ...DEFAULT_BRAND_STORY, ...parsed };
        }
      } catch (err) {
        console.warn('Failed to parse brand_story from DB:', err);
      }
    }

    return NextResponse.json({
      success: true,
      settings: {
        hero_slides: heroSlides,
        announcement_bar: announcementBar,
        editorial_looks: editorialLooks,
        brand_story: brandStory,
      },
    });
  } catch (error) {
    console.error('Public content GET error:', error);
    // Return defaults on error so the storefront never breaks
    return NextResponse.json({
      success: true,
      fallback: true,
      settings: {
        hero_slides: DEFAULT_HERO_SLIDES,
        announcement_bar: DEFAULT_ANNOUNCEMENT_BAR,
        editorial_looks: DEFAULT_EDITORIAL_LOOKS,
        brand_story: DEFAULT_BRAND_STORY,
      },
    });
  }
}
