'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string | null;
    email: string;
    role: string;
}

interface CheckoutFormProps {
    user: User | null;
}

export default function CheckoutForm({ user }: CheckoutFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        paymentMethod: 'card',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // Foydalanuvchi ma'lumotlarini formga qo'yish
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Savatchadagi mahsulotlarni olish
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            
            if (cartItems.length === 0) {
                setError('Savatchada mahsulotlar yo\'q');
                setLoading(false);
                return;
            }

            // Buyurtma ma'lumotlarini tayyorlash
            const orderData = {
                ...formData,
                userId: user?.id,
                items: cartItems,
                totalAmount: cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
                orderDate: new Date().toISOString(),
            };

            // Buyurtmani saqlash uchun API'ga yuborish
            // Bu qismni keyinroq qo'shasiz
            console.log('Buyurtma ma\'lumotlari:', orderData);

            // Foydalanuvchiga xabar berish
            alert('Buyurtmangiz muvaffaqiyatli qabul qilindi!');
            
            // Savatchani tozalash
            localStorage.removeItem('cart');
            
            // Bosh sahifaga yo'naltirish
            router.push('/');
            router.refresh();

        } catch (err) {
            console.error('Buyurtma yaratishda xatolik:', err);
            setError('Buyurtmani yaratishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                    {error}
                </div>
            )}
            
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shaxsiy ma'lumotlar</h2>
            
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">To'liq ism *</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md" 
                    required 
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md" 
                    required 
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami *</label>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md" 
                    required 
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Yetkazib berish manzili *</label>
                <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md" 
                    required 
                />
            </div>
            
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">To'lov ma'lumotlari</h2>
            
            <div className="mb-4">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">To'lov usuli *</label>
                <select 
                    id="paymentMethod" 
                    name="paymentMethod" 
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md" 
                    required
                >
                    <option value="card">Bank kartasi</option>
                    <option value="cash">Naqd pul (yetkazib berilganda)</option>
                </select>
            </div>
            
            {formData.paymentMethod === 'card' && (
                <>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Karta raqami *</label>
                        <input 
                            type="text" 
                            id="cardNumber" 
                            name="cardNumber" 
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full border border-gray-300 p-2 rounded-md" 
                            required={formData.paymentMethod === 'card'} 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Amal qilish muddati *</label>
                            <input 
                                type="text" 
                                id="cardExpiry" 
                                name="cardExpiry" 
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full border border-gray-300 p-2 rounded-md" 
                                required={formData.paymentMethod === 'card'} 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-1">CVC/CVV *</label>
                            <input 
                                type="text" 
                                id="cardCVC" 
                                name="cardCVC" 
                                value={formData.cardCVC}
                                onChange={handleChange}
                                placeholder="123"
                                className="w-full border border-gray-300 p-2 rounded-md" 
                                required={formData.paymentMethod === 'card'} 
                            />
                        </div>
                    </div>
                </>
            )}
            
            <button 
                type="submit" 
                className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Yuborilmoqda...' : 'Buyurtmani yakunlash'}
            </button>
        </form>
    );
}