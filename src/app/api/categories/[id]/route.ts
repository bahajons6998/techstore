import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Next.js 15 uchun params Promise bo'lishi kerak
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const category = await prisma.category.findFirst({
            where: {
                id: parseInt(resolvedParams.id, 10),
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