import { logout } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

// Logout sahifasi, foydalanuvchini avtomatik tarzda tizimdan chiqaradi
export default function LogoutPage() {
  // Server component bo'lgani uchun to'g'ridan-to'g'ri server-side action'ni chaqira olamiz
  logout();
  
  // Bu qismga yetib kelmaydi, chunki logout() funksiyasi redirect qiladi
  return null;
}