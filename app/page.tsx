'use client';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { HomeWhenSignedIn } from './_components/HomeWhenSignedIn';
import { HomeWhenSignedOut } from './_components/HomeWhenSignedOut';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="w-full">
      <SignedIn>
        <HomeWhenSignedIn />
      </SignedIn>

      <SignedOut>
        <HomeWhenSignedOut />
      </SignedOut>
    </main>
  );
}
