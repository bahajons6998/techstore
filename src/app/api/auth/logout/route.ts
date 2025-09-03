import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Async cookies API bilan token cookie'sini o'chirish
    const cookiesStore = await cookies();
    cookiesStore.delete('token');
    
    // Kirish sahifasiga yo'naltirish
    return NextResponse.redirect(new URL('/login', request.url));
  } catch (error) {
    console.error('Logout xatoligi:', error);
    return NextResponse.json(
      { error: 'Tizimdan chiqishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}