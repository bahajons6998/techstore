import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLoggedInUser } from '@/app/actions/auth';

// GET /api/products - mahsulotlarni olish
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    // Qidiruv parametrlari
    const where: any = {};
    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    // Mahsulotlarni olish
    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error);
    return NextResponse.json(
      { error: 'Mahsulotlarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/products - yangi mahsulot qo'shish
export async function POST(request: NextRequest) {
  try {
    // Admin huquqini tekshirish
    const user = await getLoggedInUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Bu amalni bajarish uchun huquq yo\'q' },
        { status: 403 }
      );
    }

    const data = await request.json();
    console.log('57 qator', data);
    // Majburiy ma'lumotlarni tekshirish
    if (!data.name || !data.description || !data.price) {
      return NextResponse.json(
        { error: 'Nomi, tavsifi va narxi maydonlari to\'ldirilishi shart' },
        { status: 400 }
      );
    }

    // Mahsulot yaratish
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock || 0,
        imageUrl: data.imageUrl || null,
        categoryId: parseInt(data.categoryId, 10) || null,
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

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Mahsulot yaratishda xatolik:', error);
    return NextResponse.json(
      { error: 'Mahsulot yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}