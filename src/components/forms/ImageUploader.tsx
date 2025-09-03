'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onUploadSuccess?: (fileUrl: string) => void;
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Faylni oldindan ko'rish
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Xatolikni tozalash
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Rasmni yuklashda xatolik yuz berdi');
      }

      // Muvaffaqiyatli yuklanganda
      if (onUploadSuccess) {
        onUploadSuccess(data.fileUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rasmni yuklashda xatolik yuz berdi');
      console.error('Yuklash xatoligi:', err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Rasm yuklash
      </label>
      
      <div className="mt-1 flex flex-col items-center">
        {preview && (
          <div className="mb-4 relative w-48 h-48">
            <Image
              src={preview}
              alt="Rasm oldindan ko'rish"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        
        <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {isUploading ? 'Yuklanmoqda...' : 'Rasmni tanlang'}
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
        
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
        
        <p className="mt-2 text-xs text-gray-500">
          PNG, JPG, WebP yoki GIF (maks. 5MB)
        </p>
      </div>
    </div>
  );
}