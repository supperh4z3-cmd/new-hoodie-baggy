import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

const ALLOWED_FOLDERS = new Set(['products', 'site', 'brand', 'lookbook']);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB max

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminToken(token) : null;
    if (!admin) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim. Lütfen admin girişi yapınız.' },
        { status: 401 }
      );
    }

    // 2. Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderParam = (formData.get('folder') as string) || 'products';

    if (!file) {
      return NextResponse.json(
        { error: 'Yüklenecek dosya seçilmedi.' },
        { status: 400 }
      );
    }

    // 3. Validate folder name to prevent path traversal
    const safeFolder = ALLOWED_FOLDERS.has(folderParam) ? folderParam : 'products';

    // 4. Validate MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `Geçersiz dosya formatı (${file.type}). Desteklenen formatlar: JPG, PNG, WebP, AVIF, GIF, MP4, WebM, MOV.`,
        },
        { status: 400 }
      );
    }

    // 5. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Dosya boyutu çok büyük. Maksimum dosya boyutu 50MB olabilir.' },
        { status: 400 }
      );
    }

    // 6. Generate safe filename
    const originalName = file.name || 'upload';
    const ext = path.extname(originalName).toLowerCase() || (file.type.startsWith('video/') ? '.mp4' : '.webp');
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 40) || 'media';

    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const finalFilename = `${timestamp}-${baseName}-${randomSuffix}${ext}`;

    // 7. Ensure target directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    // 8. Write file to disk
    const filePath = path.join(uploadDir, finalFilename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
      folder: safeFolder,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Dosya yüklenirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
