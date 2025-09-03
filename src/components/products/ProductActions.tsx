'use client';

import { useState } from 'react';

interface ProductActionsProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string | null;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
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
      
      // Muvaffaqiyatli qo'shilgani haqida xabar berish mumkin
      alert("Mahsulot savatchaga qo'shildi!");
    } catch (error) {
      console.error("Savatchaga qo'shishda xatolik:", error);
      alert("Savatchaga qo'shishda xatolik yuz berdi.");
    } finally {
      setIsAdding(false);
    }
  };

  const buyNow = () => {
    // Savatchaga qo'shib, to'g'ridan-to'g'ri checkout sahifasiga o'tkazish
    addToCart();
    window.location.href = '/checkout';
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={addToCart}
        disabled={isAdding}
        className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Qo&apos;shilyapti...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
            </svg>
            Savatchaga qo&apos;shish
          </>
        )}
      </button>
      
      <button
        onClick={buyNow}
        disabled={isAdding}
        className={`flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        Hozir xarid qilish
      </button>
    </div>
  );
}