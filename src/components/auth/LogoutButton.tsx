'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh page to update the UI
        router.refresh();
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
      className="text-gray-700 hover:text-blue-600"
      type="button"
    >
      Chiqish
    </button>
  );
}