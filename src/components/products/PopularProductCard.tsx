'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string | null;
}

interface PopularProductCardProps {
  product: Product;
}

export default function PopularProductCard({ product }: PopularProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = () => {
    setIsAdding(true);
    try {
      // Savatcha ma'lumotlarini localStorage dan olish
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Mahsulot allaqachon savatda bormi tekshirish
      const existingProductIndex = currentCart.findIndex((item: any) => item.id === product.id);
      
      let newCart;
      if (existingProductIndex >= 0) {
        // Agar mahsulot allaqachon savatda bo'lsa, sonini oshirish
        newCart = [...currentCart];
        newCart[existingProductIndex].quantity = (newCart[existingProductIndex].quantity || 1) + 1;
      } else {
        // Agar mahsulot savatda bo'lmasa, qo'shish
        newCart = [...currentCart, { ...product, quantity: 1 }];
      }
      
      // Yangilangan savatni localStorage ga saqlash
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      // Storage event trigger qilish uchun
      window.dispatchEvent(new Event('storage'));
      
      // 300ms dan keyin tugma holatini qaytarish (vizual feedback)
      setTimeout(() => {
        setIsAdding(false);
      }, 300);
    } catch (error) {
      console.error("Savatchaga qo'shishda xatolik:", error);
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-48 bg-gray-100">
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg" style={{ zIndex: 1 }}>
          Mashhur
        </div>
        {product.imageUrl ? (
          <UniversalImage
            src={product.imageUrl}
            alt={product.name}
            fill={true}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-xs text-gray-500 ml-1">4.5</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">
            {product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
          </span>
          <div className="flex space-x-2">
            <button 
              onClick={addToCart}
              className={`p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ${isAdding ? 'animate-pulse' : ''}`}
              title="Savatchaga qo'shish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <Link 
              href={`/products/${product.id}`}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="Batafsil ko'rish"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}