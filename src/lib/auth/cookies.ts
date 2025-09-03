import { cookies } from 'next/headers';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}

export async function setToken(data: any) {
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

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  const token = await getToken();
  if (!token) return null;
  
  return verifyToken(token);
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user && typeof user === 'object' && user.role === 'ADMIN';
}