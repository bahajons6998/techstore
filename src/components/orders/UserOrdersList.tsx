'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';
import { Prisma } from '@prisma/client';
type Decimal = Prisma.Decimal;

// Buyurtma statusi ranglari
const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

// Buyurtma statusi nomlari
const statusNames = {
  PENDING: 'Kutilmoqda',
  PROCESSING: 'Ishlanmoqda',
  SHIPPED: 'Yo\'lda',
  DELIVERED: 'Yetkazildi',
  CANCELLED: 'Bekor qilindi'
};

// Props interfeysi
interface OrderItemProduct {
  id: number;
  name: string;
  imageUrl?: string | null;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: Decimal | string;
  product: OrderItemProduct;
}

interface Order {
  id: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalPrice: Decimal | string;
  createdAt: Date | string;
  items: OrderItem[];
}

interface UserOrdersListProps {
  orders: Order[];
}

export default function UserOrdersList({ orders }: UserOrdersListProps) {
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
  
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10 bg-white shadow-sm rounded-lg">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Buyurtmalar mavjud emas</h3>
        <p className="text-gray-500 mb-6">Siz hali hech qanday buyurtma bermagansiz</p>
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {orders.map((order) => (
        <div key={order.id} className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <span className="text-gray-500 text-sm">Buyurtma #{order.id}</span>
              <div className="flex items-center mt-1">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                  {statusNames[order.status]}
                </span>
                <span className="text-gray-500 text-sm ml-3">{formatDate(order.createdAt)}</span>
              </div>
            </div>
            <button
              onClick={() => toggleOrderExpand(order.id)}
              className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-900 text-sm font-medium"
            >
              {expandedOrder === order.id ? 'Yopish' : 'Batafsil ko\'rish'}
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-gray-900 font-medium">
              {order.items.length} ta mahsulot
            </div>
            <div className="text-lg font-medium text-gray-900">
              {Number(order.totalPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
            </div>
          </div>
          
          {/* Ochilgan buyurtma tafsilotlari */}
          {expandedOrder === order.id && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Buyurtma elementlari</h4>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      {item.product?.imageUrl ? (
                        <UniversalImage
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover object-center"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <Link href={`/products/${item.product.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.quantity} × {Number(item.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {(Number(item.price) * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}