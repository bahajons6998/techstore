import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // production da .env faylida saqlash kerak

// Parolni xeshlash
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

// Parolni tekshirish
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

// JWT token yaratish
export function createToken(data: any): string {
  return sign(data, JWT_SECRET, { expiresIn: '1d' });
}

// JWT tokenni tekshirish
export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Login bo'lgan foydalanuvchini aniqlash
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return null;
    }
    
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

// Admin ekanligini tekshirish
export async function isAdmin() {
  const user = await getCurrentUser();
  return user && typeof user === 'object' && user.role === 'ADMIN';
}