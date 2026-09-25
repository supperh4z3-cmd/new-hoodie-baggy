export interface HeroSlide {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  coordinates: string;
  city: string;
  badge: string;
  headline?: string;
  useLogo?: boolean;
  tagline: string;
  ctaText: string;
  ctaLink: string;
}

export interface AnnouncementBarContent {
  enabled: boolean;
  text: string;
  subtext: string;
  linkText: string;
  linkUrl: string;
}

export interface EditorialLook {
  id: string;
  frameNo: string;
  title: string;
  category: 'all' | 'hoodies' | 'bottoms' | 'night' | 'video';
  subtitle: string;
  location: string;
  cameraInfo: string;
  modelSpecs: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  aspect?: string;
  tilt?: string;
  offset?: string;
  tags?: string[];
  featuredProductSlug: string;
  quote?: string;
}

export interface BrandStoryContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  paragraph1: string;
  paragraph2: string;
  stats: Array<{ label: string; icon: string }>;
  image: string;
}

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    type: 'video',
    src: '/videos/hero-night-city.webm',
    poster: '/images/hero/hero-bg.webp',
    coordinates: '41.0082° N, 28.9784° E',
    city: 'İSTANBUL',
    badge: 'SOKAK MODASI YENİDEN TANIMLANDI',
    useLogo: true,
    tagline: 'Aynı Şehir, Farklı Bakış Açısı',
    ctaText: 'HEMEN KEŞFET',
    ctaLink: '/shop',
  },
  {
    id: 'slide-2',
    type: 'video',
    src: '/videos/hero-traffic-night.webm',
    poster: '/images/hero/hero-bg.webp',
    coordinates: '52.3676° N, 4.9041° E',
    city: 'AMSTERDAM & İSTANBUL',
    badge: '2026 DRILL KOLEKSİYONU',
    headline: 'SOKAKLARDAN DÜNYAYA',
    tagline: 'Sıradan Kıyafetlerin Ötesinde Bir Yaşam Tarzı',
    ctaText: "YENİ DROP'U İNCELE",
    ctaLink: '/shop?category=hoodies',
  },
  {
    id: 'slide-3',
    type: 'video',
    src: '/videos/hero-skyline-night.webm',
    poster: '/images/hero/hero-bg.webp',
    coordinates: '460 GSM SAF FRANSIZ PAMUKLU',
    city: 'SINIRLI SERİ',
    badge: 'TAVİZSİZ TOK KALIPLAR',
    headline: 'OVERSIZE & BAGGY KESİMLER',
    tagline: 'Yıllar Boyu Formunu Kaybetmeyen Dik Duruş',
    ctaText: 'EŞOFMAN & HOODIE',
    ctaLink: '/shop?category=sweatpants',
  },
  {
    id: 'slide-4',
    type: 'video',
    src: '/videos/hero-street-lights.webm',
    poster: '/images/hero/hero-bg.webp',
    coordinates: 'GECE SOKAKLARI // İSTANBUL',
    city: 'KADIKÖY & BEYOĞLU',
    badge: 'YENİ GÖMLEK & T-SHIRT DROPLARI',
    headline: 'SOKAK IŞIKLARI ALTINDA',
    tagline: 'Ağır Pamuklu Kumaşlar ve Tavizsiz Dökümler',
    ctaText: 'YENİ DROPLARI KEŞFET',
    ctaLink: '/shop',
  },
];

export const DEFAULT_ANNOUNCEMENT_BAR: AnnouncementBarContent = {
  enabled: true,
  text: "2.000 TL ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ KARGO",
  subtext: 'YENİ DROP: ISTANBUL DRILL 2026',
  linkText: 'ŞİMDİ KEŞFET →',
  linkUrl: '/shop',
};

export const DEFAULT_EDITORIAL_LOOKS: EditorialLook[] = [
  {
    id: 'look-1',
    frameNo: 'FRAME [01/07]',
    title: 'UNDERGROUND TUNNEL DRILL',
    category: 'hoodies',
    subtitle: 'Ağır 460 GSM French Terry pamuklu ve çift katmanlı dik duran kapüşon silüeti.',
    location: '41.0082° N, 28.9784° E / İSTANBUL',
    cameraInfo: 'Leica M6 // Kodak Tri-X 400 B&W // 35mm f/1.4',
    modelSpecs: 'Boy: 1.88 m • Kilo: 78 kg • Beden: L / Oversize',
    mediaType: 'image',
    mediaSrc: '/images/brand/drill-editorial-1.webp',
    aspect: 'aspect-[3/4]',
    tilt: '-rotate-2',
    offset: 'lg:translate-y-0',
    tags: ['460 GSM', 'PITCH BLACK', 'HEAVY HOODIE'],
    featuredProductSlug: 'drill-logo-hoodie',
    quote: 'Göz alıcı değil, tehditkar ve tavizsiz bir duruş.',
  },
  {
    id: 'look-2',
    frameNo: 'FRAME [02/07]',
    title: 'AMSTERDAM CANAL NIGHT',
    category: 'bottoms',
    subtitle: 'Dökümlü geniş paça eşofman ve teknik fermuarlı ceket uyumu.',
    location: '52.3676° N, 4.9041° E / AMSTERDAM',
    cameraInfo: 'Contax T2 // Fujifilm Superia 800 // 38mm f/2.8',
    modelSpecs: 'Boy: 1.84 m • Kilo: 74 kg • Beden: M / Baggy Döküm',
    mediaType: 'image',
    mediaSrc: '/images/brand/drill-editorial-2.webp',
    aspect: 'aspect-[4/5]',
    tilt: 'rotate-2',
    offset: 'lg:translate-y-16',
    tags: ['WIDE LEG', 'DWR COATING', 'TACTICAL'],
    featuredProductSlug: 'heavy-baggy-sweatpants',
    quote: 'Sokakların geceye teslim olduğu saatler.',
  },
  {
    id: 'look-3',
    frameNo: 'FRAME [03/07] - CANLI REEL',
    title: 'NIGHT RUNNER STREET REEL',
    category: 'video',
    subtitle: 'Karanlık sokak lambaları altında hareket halindeki oversize silüetler.',
    location: 'KADIKÖY RIHTIM & BOĞAZ HATTI',
    cameraInfo: 'Arri Alexa Mini LF // 28mm Cinema Prime // ISO 3200',
    modelSpecs: 'Canlı Hareket Testi // 1080p 60FPS Video',
    mediaType: 'video',
    mediaSrc: '/videos/hero-traffic-night.webm',
    aspect: 'aspect-[4/5]',
    tilt: '-rotate-1',
    offset: 'lg:-translate-y-6',
    tags: ['CANLI VİDEO', 'GECE HAREKETİ', 'DRILL REEL'],
    featuredProductSlug: 'drill-logo-hoodie',
    quote: 'Kıyafet dururken değil, sokakta adımlarken kendini gösterir.',
  },
  {
    id: 'look-4',
    frameNo: 'FRAME [04/07]',
    title: 'RAW JAPANESE SELVEDGE DENIM',
    category: 'bottoms',
    subtitle: '14.5 oz sert Japon ham kumaşı üzerine vintage taş yıkama ve özel eskitme.',
    location: 'KADIKÖY SOKAKLARI / MODA',
    cameraInfo: 'Hasselblad 503CW // Ilford HP5 400 // 80mm Planar',
    modelSpecs: 'Boy: 1.86 m • Kilo: 77 kg • Beden: 32 / Baggy Wide',
    mediaType: 'image',
    mediaSrc: '/images/categories/jeans-cat.webp',
    aspect: 'aspect-square',
    tilt: 'rotate-3',
    offset: 'lg:translate-y-12',
    tags: ['14.5 OZ', 'RIGID DENIM', 'VINTAGE WASH'],
    featuredProductSlug: 'vintage-washed-jeans',
    quote: 'Formunu kaybetmeyen, zamanla sana uyum sağlayan zırh.',
  },
  {
    id: 'look-5',
    frameNo: 'FRAME [05/07]',
    title: 'BOX-CUT ARCHITECTURE',
    category: 'hoodies',
    subtitle: 'Düşük omuzlar, geniş gövde dökümü ve bilekleri kavrayan tok ribanalar.',
    location: 'GALATA KULESİ / GECE ÇEKİMİ',
    cameraInfo: 'Canon EOS 1V // Kodak Portra 800 // 50mm f/1.2',
    modelSpecs: 'Boy: 1.82 m • Kilo: 72 kg • Beden: M / Boxy Kesim',
    mediaType: 'image',
    mediaSrc: '/images/categories/hoodies-cat.webp',
    aspect: 'aspect-[3/4]',
    tilt: '-rotate-2',
    offset: 'lg:translate-y-24',
    tags: ['BOXY FIT', 'DROP SHOULDER', 'HEAVY RIB'],
    featuredProductSlug: 'drill-logo-hoodie',
    quote: 'Kalıplarımız standart ölçü tablolarına uymaz; sokağa uyar.',
  },
  {
    id: 'look-6',
    frameNo: 'FRAME [06/07]',
    title: 'TACTICAL NIGHT COAT',
    category: 'night',
    subtitle: 'Gizli cepler, rüzgar geçirmez membran ve mat siyah YKK fermuarlar.',
    location: 'KARAKÖY LİMAN / YAĞMURLU GECE',
    cameraInfo: 'Mamiya 7II // 65mm f/4 // Cinestill 800T',
    modelSpecs: 'Boy: 1.89 m • Kilo: 80 kg • Beden: L / Katmanlı Giyim',
    mediaType: 'image',
    mediaSrc: '/images/categories/jackets-cat.webp',
    aspect: 'aspect-[4/5]',
    tilt: 'rotate-1',
    offset: 'lg:translate-y-4',
    tags: ['WATERPROOF', 'MATTE BLACK', 'YKK ZIPPERS'],
    featuredProductSlug: 'tactical-zip-jacket',
    quote: 'Şehrin sert havasına karşı tam koruma.',
  },
  {
    id: 'look-7',
    frameNo: 'FRAME [07/07]',
    title: 'BAGGY DRAPE MOTION',
    category: 'bottoms',
    subtitle: "Sneaker'ların üzerine tam oturan geniş paça dökümü.",
    location: 'BEŞİKTAŞ / İSKELE MEYDANI',
    cameraInfo: 'Nikon F3 // 50mm f/1.4 // Fuji Neopan Acros 100',
    modelSpecs: 'Boy: 1.85 m • Kilo: 76 kg • Beden: L / Geniş Paça',
    mediaType: 'image',
    mediaSrc: '/images/categories/sweatpants-cat.webp',
    aspect: 'aspect-square',
    tilt: '-rotate-3',
    offset: 'lg:translate-y-16',
    tags: ['FRENCH TERRY', 'EXTRA POCKETS', 'CHUNKY DRAWSTRING'],
    featuredProductSlug: 'heavy-baggy-sweatpants',
    quote: 'Hareket özgürlüğü ve tavizsiz salaşlık.',
  },
];

export const DEFAULT_BRAND_STORY: BrandStoryContent = {
  badge: 'KURALLARI YIKAN SOKAK MODASI',
  titleLine1: 'FROM ISTANBUL',
  titleLine2: 'TO THE WORLD',
  paragraph1:
    "Baggy Street; Amsterdam'ın yağmurlu kanallarında doğan karanlık drill müziğinin sert basları ile İstanbul sokaklarının bitmeyen enerjisini bir araya getiren bağımsız bir tasarım atölyesidir.",
  paragraph2:
    'Hızlı modanın dayattığı tekdüze dar kalıplara meydan okuyoruz. 460 GSM saf Fransız havlu pamuk, 14.5 oz sert Japon selvedge denim ve düşük omuzlu tok boxy kalıplarla sokağın gerçek zırhını inşa ediyoruz.',
  stats: [
    { label: '460 GSM SAF HAVLU', icon: 'HeavyStitch' },
    { label: '14.5 OZ RAW DENİM', icon: 'HeavyStitch' },
    { label: '380 GSM FLANEL', icon: 'HeavyStitch' },
    { label: '300 GSM ASİT YIKAMA', icon: 'HeavyStitch' },
  ],
  image: '/images/brand/brand-story.webp',
};
