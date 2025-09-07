import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLoggedInUser } from '@/app/actions/auth';

// Buyurtmalarni yaratish uchun API endpoint
export async function POST(request: NextRequest) {
    try {
        // Foydalanuvchi ma'lumotlarini olish
        const user = await getLoggedInUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Autentifikatsiya talab qilinadi' },
                { status: 401 }
            );
        }

        // Requestdan ma'lumotlarni olish
        const data = await request.json();
        
        // Asosiy validatsiya
        if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
            return NextResponse.json(
                { error: 'Buyurtma elementlari to\'g\'ri ko\'rsatilmagan' },
                { status: 400 }
            );
        }

        if (!data.totalPrice || isNaN(Number(data.totalPrice))) {
            return NextResponse.json(
                { error: 'Buyurtma summasi ko\'rsatilmagan yoki noto\'g\'ri' },
                { status: 400 }
            );
        }

        // Buyurtmani yaratish
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: 'PENDING',
                totalPrice: data.totalPrice,
                items: {
                    create: data.items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                },
                // Qo'shimcha ma'lumotlarni metadata sifatida saqlash
                // prisma.jsonb('metadata', {
                //     address: data.address,
                //     phone: data.phone,
                //     paymentMethod: data.paymentMethod
                // })
            },
            include: {
                items: true
            }
        });

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                totalPrice: order.totalPrice,
                status: order.status,
                createdAt: order.createdAt
            }
        });
    } catch (error) {
        console.error('Buyurtmani yaratishda xatolik:', error);
        return NextResponse.json(
            { error: 'Buyurtmani yaratishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}