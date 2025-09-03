import { getLoggedInUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const user = await getLoggedInUser();
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { error: 'Bu amalni bajarish uchun huquq yo\'q' },
            { status: 403 }
        );
    }
    const products = await prisma.product.findMany({})
    const users = await prisma.user.findMany({})
    const orders = await prisma.order.findMany({})
    const categories = await prisma.category.findMany({})

    return new Response(JSON.stringify({ products: products.length, users: users.length, orders: orders.length, categories: categories.length }))
}