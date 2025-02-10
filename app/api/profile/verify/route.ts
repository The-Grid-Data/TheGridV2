import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid profile code' },
        { status: 400 }
      );
    }

    // Update user's public metadata with the provided code
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        rootId: code,
        signupSource: 'web'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying profile code:', error);
    return NextResponse.json(
      { error: 'Failed to verify profile code' },
      { status: 500 }
    );
  }
}
