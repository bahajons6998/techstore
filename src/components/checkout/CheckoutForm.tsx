'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// To'lov usullari
enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD'
}

// Props
interface CheckoutFormProps {
  user: any;
  cartItems: any[];
  totalPrice: number;
  onSuccess: () => void;
}

export default function CheckoutForm({ user, cartItems, totalPrice, onSuccess }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      setError('Yetkazib berish manzilini kiriting');
      return;
    }

    if (!phone.trim()) {
      setError('Telefon raqamingizni kiriting');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Buyurtma ma'lumotlari
      const orderData = {
        userId: user.id,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        address: address,
        phone: phone,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Buyurtmani saqlash uchun API-ga so'rov yuborish
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Buyurtma yaratishda xatolik yuz berdi');
      }

      // Muvaffaqiyatli bo'lsa, onSuccess callbackni chaqirish
      onSuccess();
    } catch (error) {
      console.error('Buyurtma yaratishda xatolik:', error);
      setError(error instanceof Error ? error.message : 'Buyurtma yaratishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Yetkazib berish ma'lumotlari</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ism familiya
          </label>
          <input
            type="text"
            id="name"
            value={user?.name || ''}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ''}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon raqami <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+998 XX XXX XX XX"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Yetkazib berish manzili <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="To'liq manzilni kiriting"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 min-h-[100px]"
            required
          />
        </div>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-4">To'lov usuli</h2>

      <div className="space-y-3 mb-8">
        <div className="flex items-center">
          <input
            id="cash"
            name="paymentMethod"
            type="radio"
            checked={paymentMethod === PaymentMethod.CASH}
            onChange={() => setPaymentMethod(PaymentMethod.CASH)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
            Naqd pul bilan to'lash
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="card"
            name="paymentMethod"
            type="radio"
            checked={paymentMethod === PaymentMethod.CARD}
            onChange={() => setPaymentMethod(PaymentMethod.CARD)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
            Karta orqali to'lash
          </label>
        </div>
      </div>

      {paymentMethod === PaymentMethod.CARD && (
        <div className="p-4 mb-6 bg-yellow-50 border border-yellow-100 rounded-md text-yellow-800">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm">
                Karta orqali to'lov qilish uchun operator tomonidan qo'ng'iroq qilinadi. Siz karta ma'lumotlarini operatorga aytasiz.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Buyurtma berilmoqda...
          </span>
        ) : (
          'Buyurtma berish'
        )}
      </button>
    </form>
  );
}