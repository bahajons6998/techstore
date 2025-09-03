'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/forms/ImageUploader';

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    try {
      // Formaga rasmni qo'shish
      if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Mahsulot qo\'shishda xatolik yuz berdi');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mahsulot qo\'shishda xatolik yuz berdi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Rasm yuklanganda ishlatiladigan funksiya
  function handleImageUpload(fileUrl: string) {
    setImageUrl(fileUrl);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yangi mahsulot qo'shish</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form action={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boshqa formalar... */}
            
            {/* Rasm yuklash komponenti */}
            <div className="md:col-span-2">
              <ImageUploader onUploadSuccess={handleImageUpload} />
              {imageUrl && (
                <input type="hidden" name="imageUrl" value={imageUrl} />
              )}
            </div>

            {/* Submit tugmasi */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}