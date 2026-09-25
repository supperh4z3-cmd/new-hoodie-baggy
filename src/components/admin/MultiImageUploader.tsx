'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  X,
  Star,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
} from 'lucide-react';

interface MultiImageUploaderProps {
  images: string[];
  coverImage: string;
  onChange: (images: string[], coverImage: string) => void;
  maxImages?: number;
  folder?: string;
}

export function MultiImageUploader({
  images,
  coverImage,
  onChange,
  maxImages = 8,
  folder = 'products',
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    setError(null);
    const fileList = Array.from(files);

    if (fileList.length === 0) return;

    if (images.length + fileList.length > maxImages) {
      setError(`Maksimum ${maxImages} adet görsel ekleyebilirsiniz.`);
      return;
    }

    setUploading(true);

    try {
      const newUrls: string[] = [];

      for (const file of fileList) {
        // Validate size
        if (file.size > 50 * 1024 * 1024) {
          throw new Error(`${file.name} 50MB sınırından büyük.`);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `${file.name} yüklenemedi.`);
        }

        const data = await res.json();
        newUrls.push(data.url);
      }

      const updatedImages = [...images, ...newUrls];
      const updatedCover = coverImage && updatedImages.includes(coverImage)
        ? coverImage
        : updatedImages[0] || '';

      onChange(updatedImages, updatedCover);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Yükleme sırasında hata oluştu.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = customUrl.trim();
    if (!url) return;

    if (images.length >= maxImages) {
      setError(`Maksimum ${maxImages} adet görsel ekleyebilirsiniz.`);
      return;
    }

    if (images.includes(url)) {
      setError('Bu görsel bağlantısı zaten galeride ekli.');
      return;
    }

    const updatedImages = [...images, url];
    const updatedCover = coverImage || url;
    onChange(updatedImages, updatedCover);
    setCustomUrl('');
    setShowUrlInput(false);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const targetUrl = images[indexToRemove];
    const updatedImages = images.filter((_, idx) => idx !== indexToRemove);

    let updatedCover = coverImage;
    if (coverImage === targetUrl) {
      updatedCover = updatedImages[0] || '';
    }

    onChange(updatedImages, updatedCover);
  };

  const handleSetCover = (imgUrl: string) => {
    onChange(images, imgUrl);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    onChange(copy, coverImage);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between">
        <label className="block text-zinc-400 uppercase text-[11px] font-bold">
          Ürün Görselleri & Galerisi ({images.length}/{maxImages})
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1.5 underline decoration-zinc-700 underline-offset-2 transition-colors"
        >
          <LinkIcon className="w-3 h-3 text-red-500" />
          <span>{showUrlInput ? 'Kapat' : 'Harici URL Ekle'}</span>
        </button>
      </div>

      {error && (
        <div className="p-2.5 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Manual URL input fallback */}
      {showUrlInput && (
        <form onSubmit={handleAddUrl} className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-800">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://... veya /images/products/hoodie.webp"
            className="flex-1 bg-[#0a0a0e] border border-zinc-700 px-3 py-1.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-red-500 text-xs"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-[11px] tracking-wider transition-colors shrink-0"
          >
            Ekle
          </button>
        </form>
      )}

      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-red-500 bg-red-950/20'
            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/50 hover:bg-zinc-900/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={uploading || images.length >= maxImages}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-zinc-400 py-2">
            <Loader2 className="w-6 h-6 animate-spin text-red-500" />
            <span className="text-xs">Görseller yerel depoya yükleniyor...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-400 py-1 text-center">
            <UploadCloud className="w-7 h-7 text-zinc-500 hover:text-red-500 transition-colors" />
            <div>
              <span className="text-white font-bold underline decoration-red-500 underline-offset-4">
                Dosya Seç
              </span>{' '}
              veya sürükleyip bu alana bırak
            </div>
            <p className="text-[10px] text-zinc-500">
              JPG, PNG, WebP, AVIF, MP4 (Maks. 50MB). Birden fazla dosya seçebilirsiniz.
            </p>
          </div>
        )}
      </div>

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {images.map((imgUrl, index) => {
            const isCover = imgUrl === coverImage;
            const isVideo = imgUrl.endsWith('.mp4') || imgUrl.endsWith('.webm');

            return (
              <div
                key={`${imgUrl}-${index}`}
                className={`relative group bg-zinc-950 border rounded-md overflow-hidden aspect-square flex flex-col justify-between transition-all ${
                  isCover
                    ? 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] ring-1 ring-red-500'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Media Preview */}
                <div className="relative w-full h-full bg-zinc-900">
                  {isVideo ? (
                    <video
                      src={imgUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={imgUrl}
                      alt={`Görsel ${index + 1}`}
                      fill
                      sizes="140px"
                      className="object-cover"
                      unoptimized={imgUrl.startsWith('/uploads/') || imgUrl.startsWith('http')}
                    />
                  )}
                </div>

                {/* Cover Badge */}
                {isCover && (
                  <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest flex items-center gap-1 shadow-md z-10">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    <span>KAPAK</span>
                  </div>
                )}

                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 z-20">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-300 font-mono font-bold bg-black/70 px-1 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 bg-red-950/80 hover:bg-red-600 text-red-200 hover:text-white rounded transition-colors"
                      title="Görseli Sil"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'left')}
                        className="p-1 bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-30 text-zinc-300 rounded"
                        title="Öne Taşı"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={index === images.length - 1}
                        onClick={() => handleMove(index, 'right')}
                        className="p-1 bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-30 text-zinc-300 rounded"
                        title="Geriye Taşı"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {!isCover && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(imgUrl)}
                        className="text-[9px] bg-white hover:bg-red-500 hover:text-white text-black font-black uppercase px-1.5 py-1 rounded transition-colors"
                      >
                        Kapak Yap
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-[11px] text-zinc-500 italic">
          Henüz hiç görsel eklenmedi. Lütfen ürün için en az bir görsel yükleyin.
        </p>
      )}
    </div>
  );
}
