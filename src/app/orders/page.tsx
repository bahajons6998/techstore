import { requireAuth } from '@/app/actions/auth';
import { prisma } from '@/lib/prisma';
import UserOrdersList from '@/components/orders/UserOrdersList';
import { Prisma } from '@prisma/client';
type Decimal = Prisma.Decimal;

export const metadata = {
  title: 'Mening buyurtmalarim | TechStore',
  description: 'Barcha buyurtmalaringizni ko\'ring va kuzating'
};

// Foydalanuvchi buyurtmalarini olish
async function getUserOrders(userId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
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

export default async function OrdersPage() {
  // Foydalanuvchi autentifikatsiyadan o'tganligini tekshirish
  const user = await requireAuth();
  
  // Foydalanuvchi buyurtmalarini olish
  const orders = await getUserOrders(user.id);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Mening buyurtmalarim</h1>
      
      <UserOrdersList orders={orders} />
    </div>
  );
}