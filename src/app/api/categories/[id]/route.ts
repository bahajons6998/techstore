import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Next.js 15 da params Promise bo'ladi
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        // params Promise bo'lgani uchun await qilishimiz kerak
        const { id } = await context.params;
        
        const category = await prisma.category.findFirst({
            where: {
                id: parseInt(id, 10),
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Kategoriyalarni olishda xatolik:', error);
        return NextResponse.json(
            { error: 'Kategoriyalarni olishda xatolik yuz berdi' },
            { status: 500 }
        );
    }
}