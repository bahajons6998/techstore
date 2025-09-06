'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { register } from '@/app/actions/auth';
import Link from 'next/link';

// useSearchParams hook-ni ishlatadigan asosiy komponent
function RegisterFormContent() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const message = searchParams.get('message');
  const email = searchParams.get('email');

  // URL'dan kelgan email va xabarni qo'llash
  useEffect(() => {
    if (email) {
      setFormValues(prev => ({ ...prev, email }));
    }
    
    if (message) {
      setError(decodeURIComponent(message));
    }
  }, [message, email]);

  // Form qiymatlarini o'zgartirish
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // FormData obyektini yaratish
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('password', formValues.password);
    formData.append('redirect', redirectUrl);
    
    try {
      const result = await register(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Ro'yxatdan o'tgandan so'ng redirect URL ga yo'naltirish
        router.push(result.redirectUrl || '/');
        router.refresh();
      }
    } catch (err) {
      setError('Ro\'yxatdan o\'tishda xatolik yuz berdi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {redirectUrl === '/checkout' && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">
          Buyurtma berish uchun avval ro'yxatdan o'tishingiz kerak
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ism
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Parol
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Parol kamida 6 ta belgidan iborat bo'lishi kerak</p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
        </button>
        
        <div className="mt-4 text-center text-sm">
          Akkountingiz bormi?{' '}
          <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="text-blue-600 hover:underline">
            Kirish
          </Link>
        </div>
      </form>
    </div>
  );
}

// Suspense bilan o'ralgan eksport qilinadigan komponent
export default function RegisterForm() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h1>
        <p className="text-center text-gray-500">Yuklanmoqda...</p>
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
}