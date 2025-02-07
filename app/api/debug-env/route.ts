import { NextResponse } from 'next/server';

export async function GET() {
  // Only return the first few characters of the keys to avoid exposing sensitive data
  return NextResponse.json({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(
      0,
      7
    ),
    isProduction: process.env.NODE_ENV === 'production',
    mode: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_live_')
      ? 'production'
      : 'development'
  });
}
