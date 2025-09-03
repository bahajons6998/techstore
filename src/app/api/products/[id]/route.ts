import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth/auth';

// GET: Mahsulot ma'lumotlarini olish
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Noto\'g\'ri mahsulot ID' },
                { status: 400 }
            );
        }
        
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            }
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Mahsulot topilmadi' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Mahsulotni olishda xatolik:', error);
        return NextResponse.json(
            { error: 'Mahsulotni olishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}

// PUT: Mahsulotni yangilash
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Admin ekanligini tekshirish
        const adminCheck = await isAdmin();
        if (!adminCheck) {
            return NextResponse.json(
                { error: 'Ruxsat berilmagan' },
                { status: 403 }
            );
        }

        const id = parseInt(params.id);
        const data = await request.json();

        // Mahsulotni yangilash
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                ...(data.categoryId && {
                    category: {
                        connect: { id: data.categoryId }
                    }
                }),
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Mahsulotni yangilashda xatolik:', error);
        return NextResponse.json(
            { error: 'Mahsulotni yangilashda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}

// DELETE: Mahsulotni o'chirish
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Admin ekanligini tekshirish
        const adminCheck = await isAdmin();
        if (!adminCheck) {
            return NextResponse.json(
                { error: 'Ruxsat berilmagan' },
                { status: 403 }
            );
        }

        const id = parseInt(params.id);

        // Mahsulotni o'chirish
        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mahsulotni o\'chirishda xatolik:', error);
        return NextResponse.json(
            { error: 'Mahsulotni o\'chirishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}