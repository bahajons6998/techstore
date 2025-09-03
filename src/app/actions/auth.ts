'use server';

import { cookies } from 'next/headers';
import { sign, verify } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { hash, compare } from 'bcrypt';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Tokenni cookies ga saqlash
export async function setTokenCookie(data: any) {
    const token = sign(data, JWT_SECRET, { expiresIn: '1d' });
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 kun
        path: '/',
    });
    return token;
}

// Token cookiesini o'chirish
export async function removeTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
}

// Cookiesdan tokenni olish
export async function getTokenFromCookies() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

// Tokenni tekshirish
export async function verifyToken(token: string) {
    try {
        return await verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// Login bo'lgan foydalanuvchini olish
export async function getLoggedInUser() {
    const token = await getTokenFromCookies();
    if (!token) return null;

    const decoded = await verifyToken(token);
    if (!decoded || typeof decoded !== 'object') return null;

    // Foydalanuvchi ma'lumotlarini bazadan olish
    try {
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, name: true, role: true }
        });
        return user;
    } catch (error) {
        console.error('Foydalanuvchini olishda xatolik:', error);
        return null;
    }
}

// Login
export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        // Foydalanuvchini topish
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: 'Foydalanuvchi topilmadi' };
        }

        // Parolni tekshirish
        const isValid = await compare(password, user.password);
        if (!isValid) {
            return { error: 'Noto\'g\'ri parol' };
        }

        // Token yaratish va saqlash
        await setTokenCookie({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return { success: true };
    } catch (error) {
        console.error('Login xatoligi:', error);
        return { error: 'Login paytida xatolik yuz berdi' };
    }
}

// Ro'yxatdan o'tish
export async function register(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
        // Foydalanuvchi mavjudligini tekshirish
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: 'Bu email bilan foydalanuvchi allaqachon mavjud' };
        }

        // Parolni xeshlash
        const hashedPassword = await hash(password, 10);

        // Foydalanuvchini yaratish
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'USER', // Default role
            },
        });

        // Token yaratish va saqlash
        await setTokenCookie({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return { success: true };
    } catch (error) {
        console.error('Ro\'yxatdan o\'tish xatoligi:', error);
        return { error: 'Ro\'yxatdan o\'tish paytida xatolik yuz berdi' };
    }
}

// Logout
export async function logout() {
    await removeTokenCookie();
    redirect('/login');
}

// Admin huquqini tekshirish
export async function requireAdmin() {
    const user = await getLoggedInUser();

    if (!user || user.role !== 'ADMIN') {
        redirect('/login?message=Admin huquqi kerak');
    }

    return user;
}

// Login bo'lganligini tekshirish
export async function requireAuth() {
    const user = await getLoggedInUser();

    if (!user) {
        redirect('/login');
    }

    return user;
}