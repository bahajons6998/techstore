'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { requireAuth } from '@/app/actions/auth';

// CartItem interfeysi    
interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

// Savatdagi ma'lumotlarni olish
function getCartItems(): CartItem[] {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      console.error('Savatchani yuklashda xatolik:', error);
      return [];
    }
  }
  return [];
}

// Jami summani hisoblash
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Foydalanuvchi autentifikatsiyadan o'tganligini tekshirish
        const userData = await requireAuth();
        if (!userData) {
          // Autentifikatsiyadan o'tmagan bo'lsa, login sahifasiga yo'naltirish
          router.push('/login?redirect=checkout');
          return;
        }
        setUser(userData);

        // Savatdagi ma'lumotlarni olish
        const items = getCartItems();
        if (items.length === 0) {
          // Savatcha bo'sh bo'lsa, savatcha sahifasiga yo'naltirish
          router.push('/cart');
          return;
        }
        
        setCartItems(items);
        setTotalPrice(calculateTotal(items));
      } catch (error) {
        console.error('Checkout sahifasini yuklashda xatolik:', error);
        router.push('/login?redirect=checkout');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleOrderSuccess = () => {
    // Buyurtma muvaffaqiyatli bo'lganda
    setOrderSuccess(true);
    // Savatchani tozalash
    localStorage.removeItem('cart');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-10">
          <div className="text-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyurtmangiz qabul qilindi!</h2>
          <p className="text-gray-600 mb-8">
            Buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog'lanamiz.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/orders"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Buyurtmalarim
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Xaridni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Buyurtma berish</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Buyurtma ma'lumotlari */}
        <div className="md:col-span-2">
          <CheckoutForm user={user} cartItems={cartItems} totalPrice={totalPrice} onSuccess={handleOrderSuccess} />
        </div>
        
        {/* Buyurtma umumiy ma'lumotlari */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Buyurtma tafsilotlari</h2>
            
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    {item.imageUrl ? (
                      <UniversalImage
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {item.quantity} × {item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {(item.price * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <p>Mahsulotlar summasi</p>
                <p>{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <p>Yetkazib berish</p>
                <p>Bepul</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Jami</p>
                <p>{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}