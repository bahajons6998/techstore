'use client';

import { useRouter } from 'next/navigation';

// Inline logout button (link ko'rinishidagi tugma)
export default function LogoutButtonInline({ className = "" }: { className?: string }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      // Server action o'rniga API endpoint-ga so'rov yuborish
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Foydalanuvchi UI-ni yangilash
        router.refresh();
        
        // Login sahifasiga yo'naltirish
        router.push('/login');
      } else {
        console.error('Tizimdan chiqishda xatolik');
      }
    } catch (error) {
      console.error('Tizimdan chiqishda xatolik:', error);
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className={className}
      type="button"
    >
      Chiqish
    </button>
  );
}