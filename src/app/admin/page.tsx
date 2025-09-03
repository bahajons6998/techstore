import { getLoggedInUser } from '@/app/actions/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
    const user = await getLoggedInUser();

    const products = (await prisma.product.findMany({})).length;
    const categories = (await prisma.category.findMany({})).length;
    const users = (await prisma.user.findMany({})).length;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Boshqaruv paneli</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Xush kelibsiz, {user?.name || 'Admin'}</h2>
                <p className="text-gray-600">
                    Bu yerdan mahsulotlar, kategoriyalar va foydalanuvchilarni boshqarishingiz mumkin.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">Mahsulotlar</h3>
                    <p className="text-3xl font-bold mb-4">{products}</p>
                    <a href="/admin/products" className="text-blue-600 hover:underline">Barcha mahsulotlar</a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">Kategoriyalar</h3>
                    <p className="text-3xl font-bold mb-4">{categories}</p>
                    <a href="/admin/categories" className="text-blue-600 hover:underline">Barcha kategoriyalar</a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-2">Foydalanuvchilar</h3>
                    <p className="text-3xl font-bold mb-4">{users}</p>
                    <a href="/admin/users" className="text-blue-600 hover:underline">Barcha foydalanuvchilar</a>
                </div>
            </div>
        </div>
    );
}