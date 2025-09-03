import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { isAdmin } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    // Faqat admin foydalanuvchilarni tekshirish
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Ruxsat berilmagan' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Fayl topilmadi' },
        { status: 400 }
      );
    }

    // Faylni tekshirish
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri fayl formati. Faqat JPG, PNG, WebP, GIF formatlar ruxsat etilgan' },
        { status: 400 }
      );
    }

    // Maksimal fayl hajmi (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fayl hajmi juda katta. Maksimal hajm 5MB' },
        { status: 400 }
      );
    }

    // Fayl nomini yaratish va fayl formatini olish
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    
    // Fayl saqlanadigan yo'l
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Faylni yozish
    const fileBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(fileBuffer));
    
    // Faylga URL
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    return NextResponse.json({ 
      success: true, 
      fileUrl,
      message: 'Fayl muvaffaqiyatli yuklandi'
    });
    
  } catch (error) {
    console.error('Faylni yuklashda xatolik:', error);
    return NextResponse.json(
      { error: 'Faylni yuklashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
