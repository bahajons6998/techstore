import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/actions/auth';
import AdminOrdersList from '@/components/admin/orders/AdminOrdersList';
import Link from 'next/link';

export const metadata = {
  title: 'Buyurtmalar boshqaruvi | Admin Panel',
  description: 'Barcha buyurtmalarni boshqarish uchun panel'
};

// Buyurtmalarni olish
async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Decimal qiymatlarni string formatiga o'tkazamiz
    const serializedOrders = orders.map(order => ({
      ...order,
      totalPrice: order.totalPrice.toString(),
      items: order.items.map(item => ({
        ...item,
        price: item.price.toString()
      }))
    }));
    
    return serializedOrders;
  } catch (error) {
    console.error('Buyurtmalarni olishda xatolik:', error);
    return [];
  }
}

export default async function AdminOrdersPage() {
  // Admin huquqlarini tekshirish
  await requireAdmin();
  
  // Buyurtmalarni olish
  const orders = await getOrders();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buyurtmalar boshqaruvi</h1>
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Admin panelga qaytish
        </Link>
      </div>
      
      <AdminOrdersList orders={orders} />
    </div>
  );
}