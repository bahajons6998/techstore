'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';

// Cart item tipi
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

export default function CartItems() {
  // Savatcha ma'lumotlarini holatda saqlash
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // Component yuklanganda savatchani olish
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
      calculateTotal(items);
    } catch (error) {
      console.error('Savatchani yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Jami summani hisoblash
  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  // Mahsulot miqdorini o'zgartirish
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  // Mahsulotni o'chirish
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  // Savatchani tozalash
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalPrice(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Savatchangiz bo&apos;sh</h3>
        <p className="text-gray-500 mb-6">Savatchangizda hech qanday mahsulot yo&apos;q</p>
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 mb-5 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Savatchada {cartItems.length} mahsulot</h2>
        <button 
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Savatchani tozalash
        </button>
      </div>

      <div className="space-y-6 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center py-5 border-b border-gray-200 last:border-b-0">
            <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
              {item.imageUrl ? (
                <UniversalImage
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover object-center"
                  sizes="80px"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <Link href={`/products/${item.id}`} className="text-md font-medium text-gray-900 hover:text-blue-600">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">
                  {item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so&apos;m
                </p>
              </div>
              
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between text-base font-medium text-gray-900 mb-3">
          <p>Jami</p>
          <p>{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so&apos;m</p>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <p>Yetkazib berish</p>
          <p>Buyurtma paytida hisoblanadi</p>
        </div>
        <div className="mt-6">
          <Link
            href="/checkout"
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Buyurtma berish
          </Link>
        </div>
        <div className="mt-4 flex justify-center text-sm text-gray-500">
          <p>
            yoki{' '}
            <Link href="/products" className="text-blue-600 hover:text-blue-500">
              Xaridni davom ettirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}