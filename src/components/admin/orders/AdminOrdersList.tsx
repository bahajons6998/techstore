'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';

// Order status types
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Import Prisma decimal type
import { Prisma } from '@prisma/client';
type Decimal = Prisma.Decimal;

// Order item type
interface OrderItem {
  id: number;
  price: Decimal | string;
  quantity: number;
  product?: {
    id: number;
    name: string;
    imageUrl?: string | null;
  };
  orderId?: number;
  productId?: number;
}

// Order type
interface Order {
  id: number;
  status: OrderStatus;
  totalPrice: Decimal | string;
  createdAt: Date | string;
  user?: {
    id: number;
    name: string | null;
    email: string;
  };
  items: OrderItem[];
}

// Component props
interface AdminOrdersListProps {
  orders: Order[];
}

// Status ranglari
const statusColors: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

// Status nomlari
const statusNames: Record<OrderStatus, string> = {
  PENDING: 'Kutilmoqda',
  PROCESSING: 'Ishlanmoqda',
  SHIPPED: 'Yo\'lda',
  DELIVERED: 'Yetkazildi',
  CANCELLED: 'Bekor qilindi'
};

export default function AdminOrdersList({ orders }: AdminOrdersListProps) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  
  // Buyurtmani ochish/yopish
  const toggleOrderExpand = (orderId: number) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  // Sana va vaqtni formatlash - hydration-safe format
  const formatDate = (dateValue: string | Date) => {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    
    // Use a consistent date format that doesn't depend on locale
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };
  
  // Buyurtma statusini yangilash
  const updateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error('Statusni yangilashda xatolik');
      }
      
      // Sahifani yangilash
      window.location.reload();
    } catch (error) {
      console.error('Buyurtma statusini yangilashda xatolik:', error);
      alert('Buyurtma statusini yangilashda xatolik yuz berdi');
    }
  };
  
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Hech qanday buyurtma mavjud emas</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyurtma ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mijoz
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Summa
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sana
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amallar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{order.user?.name || 'N/A'}</div>
                <div className="text-sm text-gray-500">{order.user?.email || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {Number(order.totalPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                </div>
                <div className="text-sm text-gray-500">
                  {order.items.length} ta mahsulot
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                  {statusNames[order.status]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleOrderExpand(order.id)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  {expandedOrder === order.id ? 'Yopish' : 'Ko\'rish'}
                </button>
                <div className="relative inline-block text-left">
                  <select
                    className="block appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  >
                    <option value="PENDING">Kutilmoqda</option>
                    <option value="PROCESSING">Ishlanmoqda</option>
                    <option value="SHIPPED">Yo'lda</option>
                    <option value="DELIVERED">Yetkazildi</option>
                    <option value="CANCELLED">Bekor qilindi</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Ochilgan buyurtma tafsilotlari */}
      {expandedOrder && (
        <div className="border-t border-gray-200 px-6 py-4">
          {orders.filter(order => order.id === expandedOrder).map(order => (
            <div key={`details-${order.id}`}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Buyurtma #{order.id} tafsilotlari</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Mijoz ma'lumotlari</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Ism: {order.user?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Email: {order.user?.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Buyurtma elementlari</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mahsulot
                        </th>
                        <th scope="col" className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Narxi
                        </th>
                        <th scope="col" className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Miqdori
                        </th>
                        <th scope="col" className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jami
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2">
                            <div className="flex items-center">
                              <div className="relative h-10 w-10 mr-2 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                {item.product?.imageUrl ? (
                                  <UniversalImage
                                    src={item.product.imageUrl}
                                    alt={item.product?.name || ''}
                                    fill
                                    className="object-cover object-center"
                                    sizes="40px"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-gray-900">{item.product?.name || 'Mahsulot mavjud emas'}</div>
                            </div>
                          </td>
                          <td className="py-2 text-right text-sm text-gray-500">
                            {Number(item.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                          </td>
                          <td className="py-2 text-right text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="py-2 text-right text-sm font-medium text-gray-900">
                            {(Number(item.price) * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={3} className="py-2 text-right text-sm font-medium text-gray-700">
                          Jami:
                        </th>
                        <th className="py-2 text-right text-sm font-medium text-gray-900">
                          {Number(order.totalPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}