import { NextResponse } from 'next/server';
import { readData } from '@/lib/db';

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data.categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
