import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Test foydalanuvchi ma'lumotlari
    const hashedPassword = await hash('password123', 10);
    
    // Avval o'chiramiz (agar oldin mavjud bo'lsa)
    try {
      await prisma.user.delete({
        where: { email: 'test@example.com' }
      });
    } catch (error) {
      // Foydalanuvchi topilmasa, davom etamiz
    }
    
    // Test foydalanuvchini yaratamiz
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test foydalanuvchi yaratildi',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Foydalanuvchi yaratishda xatolik:', error);
    return NextResponse.json(
      { error: 'Foydalanuvchi yaratishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}