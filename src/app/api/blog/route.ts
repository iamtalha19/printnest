import { NextResponse } from 'next/server';
import db from '@/app/db.json';

export async function GET() {
  try {
    return NextResponse.json(db.blog);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    );
  }
}
