import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Salom, Next.js API!',
    time: new Date().toISOString()
  });
}