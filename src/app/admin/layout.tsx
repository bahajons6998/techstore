import { redirect } from 'next/navigation';
import { getLoggedInUser } from '../actions/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  if (!user || user.role !== 'ADMIN') {
    redirect('/login?message=Admin huquqi kerak');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">
                Boshqaruv paneli
              </a>
            </li>
            <li>
              <a href="/admin/products" className="block py-2 px-4 rounded hover:bg-gray-700">
                Mahsulotlar
              </a>
            </li>
            <li>
              <a href="/admin/categories" className="block py-2 px-4 rounded hover:bg-gray-700">
                Kategoriyalar
              </a>
            </li>
            <li>
              <a href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
                Foydalanuvchilar
              </a>
            </li>
            <li>
              <a href="/admin/orders" className="block py-2 px-4 rounded hover:bg-gray-700">
                Buyurtmalar
              </a>
            </li>
            <li>
              <form action="/api/auth/logout" method="post">
                <button type="submit" className="w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                  Chiqish
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}