import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLoggedInUser } from '@/app/actions/auth';

// GET /api/categories - kategoriyalarni olish
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Kategoriyalarni olishda xatolik:', error);
    return NextResponse.json(
      { error: 'Kategoriyalarni olishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/categories - yangi kategoriya qo'shish
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
    
    // Majburiy ma'lumotlarni tekshirish
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: 'Nomi va slug maydonlari to\'ldirilishi shart' },
        { status: 400 }
      );
    }

    // Kategoriya yaratish
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Kategoriya yaratishda xatolik:', error);
    
    // Unique constraint xatoligi
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Bu nom yoki slug bilan kategoriya allaqachon mavjud' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Kategoriya yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}