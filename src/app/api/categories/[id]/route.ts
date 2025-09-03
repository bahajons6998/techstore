import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: parseInt(params.id, 10),
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