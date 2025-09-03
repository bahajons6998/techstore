import Link from 'next/link';
import { getLoggedInUser } from '@/app/actions/auth';
import LogoutButton from '../auth/LogoutButton';

export default async function Navbar() {
  const user = await getLoggedInUser();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              TechShop
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Bosh sahifa
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Mahsulotlar
            </Link>
            
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-gray-700 hover:text-blue-600">
                    Admin panel
                  </Link>
                )}
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Kirish
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}