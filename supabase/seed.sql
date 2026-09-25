-- BAGGY STREET Database Seed Script
-- Populates initial categories and flagship streetwear products

-- 1. SEED CATEGORIES
INSERT INTO public.categories (slug, name, description, image_url, item_count)
VALUES
('hoodies', 'HOODIES', '460 GSM ağır gramajlı saf pamuk, boxy kesim drill kapüşonlular.', '/images/categories/hoodies-cat.webp', 8),
('sweatpants', 'SWEATPANTS', 'Geniş paça, dökümlü ve rahat sokak stili eşofman altları.', '/images/categories/sweatpants-cat.webp', 6),
('jackets', 'JACKETS', 'Ağır fermuarlı ceketler, drill montlar ve rüzgarlıklar.', '/images/categories/jackets-cat.webp', 5),
('jeans', 'JEANS', 'Washed denim, baggy & wide leg kesim sokak jeanleri.', '/images/categories/jeans-cat.webp', 7),
('accessories', 'ACCESSORIES', 'Bere, çelik zincirler, kemer ve sokak aksesuarları.', '/images/categories/accessories-cat.webp', 9)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
description = EXCLUDED.description,
image_url = EXCLUDED.image_url;

-- 2. SEED COUPONS
INSERT INTO public.coupons (code, discount_percentage, is_active)
VALUES
('BAGGY10', 10, true),
('DRILL20', 20, true)
ON CONFLICT (code) DO NOTHING;

-- 3. SEED FLAGSHIP PRODUCTS
INSERT INTO public.products (
    slug, name, category_slug, price, compare_at_price, badge, is_featured, is_in_stock,
    description, short_description, fabric_details, fit_details, care_instructions,
    images, colors, sizes
)
VALUES
(
    'drill-logo-hoodie',
    'HEAVYWEIGHT DRILL HOODIE (460 GSM)',
    'hoodies',
    1850.00,
    2200.00,
    'NEW',
    true,
    true,
    'Amsterdam sokak modasının karanlık ve ödün vermeyen ruhunu yansıtan ağır gramajlı hoodie. 460 GSM saf tok pamuk kumaşı, çift katmanlı dik duran kapüşonu ve göğüste kabartma Baggy Street drill nakış logosuyla zamansız bir silüet.',
    '460 GSM saf ağır pamuk kumaştan üretilen ultra ağır kapüşonlu.',
    '%100 Ağır Gramaj Saf Pamuk (460 GSM / 13.5 oz).',
    'Boxy & Drop-shoulder oversize kesim. Kendi bedeninizi alabilirsiniz.',
    'Ters çevirerek 30 derecede benzer renklerle yıkayınız. Kurutma makinesine atmayınız.',
    ARRAY['/images/products/drill-logo-hoodie.webp', '/images/editorial/drill-tunnel-crew.webp'],
    ARRAY['Pitch Black', 'Washed Charcoal', 'Concrete Grey'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL']
),
(
    'heavy-baggy-sweatpants',
    'OVERSIZED BAGGY SWEATPANTS',
    'sweatpants',
    1450.00,
    1750.00,
    'BESTSELLER',
    true,
    true,
    'Ayakkabının üzerine kusursuz şekilde dökülen geniş paça baggy eşofman altı. Derin fermuarlı cepler ve ekstra kalın bel kordonu ile sokak kullanımına özel tasarlandı.',
    'Dökümlü paça yapısı ve ekstra derin cepleriyle maksimum konfor sağlayan baggy eşofman.',
    '%100 Fırçalanmış Organik Pamuk (420 GSM).',
    'Geniş paça (wide leg), bol dökümlü sokak kalıbı.',
    '30 derecede hassas programda yıkayınız.',
    ARRAY['/images/products/baggy-sweats.webp'],
    ARRAY['Black Wash', 'Heather Grey'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL']
),
(
    'vintage-washed-jeans',
    'VINTAGE WASHED WIDE LEG JEANS',
    'jeans',
    1950.00,
    2400.00,
    'LIMITED',
    true,
    true,
    '14 oz sert Japon ham denim kumaşından özel eskitme ve taş yıkama işlemiyle üretilmiş geniş kesim sokak jean pantolonu.',
    '14 oz taş yıkanmış ham denimden üretilen vintage kesim geniş paça jean.',
    '%100 Pamuk Rigid Denim (14 oz). Esnemez, orijinal vintage denim kumaşı.',
    'Loose / Wide Leg kesim. Düz paça dökümü.',
    'İlk yıkamayı ters çevirerek soğuk suda yapınız.',
    ARRAY['/images/products/wide-jeans.webp'],
    ARRAY['Dirty Washed Blue', 'Vintage Grey', 'Raw Black'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL']
),
(
    'tactical-zip-jacket',
    'TACTICAL DRILL ZIP JACKET',
    'jackets',
    2850.00,
    3400.00,
    'NEW',
    true,
    true,
    'Su itici mat yüzeyli teknik kumaş, su geçirmez fermuarlar ve gizli iç ceplerle tasarlanmış gece drill ceketi.',
    'Su itici teknik membranlı kumaş, gizli cepler ve çift yönlü fermuar.',
    '%100 Yüksek Yoğunluklu Naylon Taslan, DWR Su İtici Kaplama.',
    'Standart bomber/oversize ceket formu. İçine hoodie giyilebilir genişlikte.',
    'Kuru temizleme önerilir veya 30 derecede narin yıkama.',
    ARRAY['/images/products/tactical-jacket.webp'],
    ARRAY['Matte Black', 'Olive Night'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL']
),
(
    'oversize-knit-cardigan',
    'DISTRESSED OVERSIZED KNIT CARDIGAN',
    'hoodies',
    2150.00,
    null,
    'EXCLUSIVE',
    true,
    true,
    'Özel jakar dokuma kalın triko iplikten üretilmiş, alt eteklerinde hafif yıpratılmış (distressed) detaylara sahip premium oversize hırka.',
    'Ağır gramajlı jakar örgü ve yıpratma detaylı premium oversize sokak hırkası.',
    '%70 Yün, %30 Akrilik kalın triko örme.',
    'Rahat bol kesim, düşük omuz.',
    'Yalnızca elde soğuk suyla yıkayınız veya sererek kurutunuz.',
    ARRAY['/images/products/knit-cardigan.webp'],
    ARRAY['Shadow Black & Grey'],
    ARRAY['S', 'M', 'L', 'XL']
)
ON CONFLICT (slug) DO UPDATE SET
price = EXCLUDED.price,
compare_at_price = EXCLUDED.compare_at_price,
description = EXCLUDED.description;
