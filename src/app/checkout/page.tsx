import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth/auth';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getLoggedInUser } from '@/app/actions/auth';

export default async function CheckoutPage() {
    // Foydalanuvchi ro'yxatdan o'tganligini tekshirish
    const isLoggedIn = await isAuthenticated();
    
    // Agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa, login sahifasiga yo'naltirish
    if (!isLoggedIn) {
        redirect('/login?redirect=/checkout');
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const user = await getLoggedInUser();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">To'lov sahifasi</h1>
            <p className="mb-4">Bu yerda foydalanuvchilar o'zlarining buyurtmalarini yakunlashlari mumkin.</p>
            <CheckoutForm user={user} />
        </div>
    );
}