'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { paths } from '@/lib/routes/paths';
import { Logo } from './logo';
import { ToggleThemeButton } from './toggle-theme-button';

const claimProfileButton = (
  <Button asChild variant="outline" className="w-full md:w-fit">
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={paths.externalUrls.claimProfile}
    >
      Claim your profile
    </Link>
  </Button>
);

const viewProfileButton = (
  <Button asChild variant="outline" className="w-full md:w-fit">
    <Link rel="noopener noreferrer" href={paths.profile.base}>
      Edit your profile
    </Link>
  </Button>
);

export const Header = () => {
  return (
    <header className="container flex w-full items-center py-4">
      <div className="w-full items-center justify-start">
        <Link href={paths.base} className="flex items-center">
          <Logo />
        </Link>
      </div>

      <div className="hidden w-full items-center justify-end gap-4 md:flex">
        <SignedOut>
          {claimProfileButton}
          <Button asChild variant="outline">
            <Link href={paths.signIn}>Sign in</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          {viewProfileButton}
          <UserButton
            afterSignOutUrl={paths.base}
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              }
            }}
          />
        </SignedIn>
        <ToggleThemeButton />
      </div>
      <Sheet>
        <SheetTrigger asChild className="flex w-full items-center justify-end">
          <div className="w-full md:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </SheetTrigger>

        <SheetContent>
          <Link className="flex items-center gap-3" href={paths.base}>
            <h3 className="text-lg font-semibold tracking-tight">The Grid</h3>
            <ToggleThemeButton />
          </Link>

          <ul className="mt-4 flex flex-col gap-3">
            <SignedOut>
              <li>
                <SheetTrigger asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={paths.signIn}>Sign in</Link>
                  </Button>
                </SheetTrigger>
              </li>
              <li>
                <SheetTrigger asChild>{claimProfileButton}</SheetTrigger>
              </li>
            </SignedOut>
            <SignedIn>
              <li className="flex justify-center">
                <UserButton
                  afterSignOutUrl={paths.base}
                  appearance={{
                    elements: {
                      avatarBox: 'h-10 w-10'
                    }
                  }}
                />
              </li>
              <li>
                <SheetTrigger asChild>{viewProfileButton}</SheetTrigger>
              </li>
            </SignedIn>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
};
