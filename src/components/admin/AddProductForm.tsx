'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function AddProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Narxni number ga o'tkazish
      console.log(formData);
      const priceNumber = parseFloat(formData.price);
      if (!formData.name || !formData.description || !formData.categoryId) {
        setError('Iltimos, barcha majburiy maydonlarni to\'ldiring');
        setLoading(false);
        return;
      }
      if (isNaN(priceNumber)) {
        setError('Narx raqam bo\'lishi kerak');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: priceNumber
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Mahsulot qo\'shishda xatolik');
      }

      // Muvaffaqiyatli qo'shilgandan so'ng, formani tozalash
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        categoryId: '',
        stock: ''
      });

      // Mahsulotlar sahifasiga qaytish
      router.push('/admin/products');
      router.refresh();

    } catch (err: any) {
      setError(err.message || 'Mahsulot qo\'shishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };


  async function getCategories() {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Kategoriyalarni olishda xatolik');
      const data = await res.json();
      setCategories(data);
    }
    catch (err) {
      console.error(err);
      return [];
    }
  }

  // Fetch categories on mount
  useEffect(() => {
    getCategories();
  }, []);



  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Yangi mahsulot qo'shish</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Mahsulot nomi *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategoriya *
          </label>

          <select
            name="categoryId"
            id="categoryId"
            required
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Mahsulot miqdori *
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Mahsulot tavsifi *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Narxi (so'm) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Rasm URL (ixtiyoriy)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Yuklanmoqda...' : 'Mahsulotni saqlash'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/products')}
          >
            Bekor qilish
          </Button>
        </div>
      </form>
    </div>
  );
}