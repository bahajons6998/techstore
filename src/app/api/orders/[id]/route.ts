import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/actions/auth';

// Next.js 15 uchun dynamic route params Promise bo'lishi kerak
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Noto\'g\'ri buyurtma ID' },
                { status: 400 }
            );
        }

        const order = await prisma.order.findUnique({
            where: { id },
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
            }
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Buyurtma topilmadi' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Buyurtmani olishda xatolik:', error);
        return NextResponse.json(
            { error: 'Buyurtmani olishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}

// Buyurtma statusini yangilash
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Admin huquqlarini tekshirish
        const adminCheck = await requireAdmin();
        if (!adminCheck) {
            return NextResponse.json(
                { error: 'Ruxsat berilmagan' },
                { status: 403 }
            );
        }

        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Noto\'g\'ri buyurtma ID' },
                { status: 400 }
            );
        }

        const data = await request.json();
        
        // Status validatsiyasi
        const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        if (!data.status || !validStatuses.includes(data.status)) {
            return NextResponse.json(
                { error: 'Noto\'g\'ri buyurtma statusi' },
                { status: 400 }
            );
        }

        // Buyurtmani yangilash
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status: data.status
            }
        });

        return NextResponse.json({
            success: true,
            order: {
                id: updatedOrder.id,
                status: updatedOrder.status,
                updatedAt: updatedOrder.updatedAt
            }
        });
    } catch (error) {
        console.error('Buyurtmani yangilashda xatolik:', error);
        return NextResponse.json(
            { error: 'Buyurtmani yangilashda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}