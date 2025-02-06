'use client';

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';
import { ToggleThemeButton } from './toggle-theme-button';
import { paths } from '@/lib/routes/paths';

const claimProfileButton = (
  <Link
    target="_blank"
    rel="noopener noreferrer"
    href={paths.externalUrls.claimProfile}
  >
    <Button variant="outline" className="w-full md:w-fit">
      Claim your profile
    </Button>
  </Link>
);

const viewProfileButton = (
  <Link target="_blank" rel="noopener noreferrer" href={paths.profile.base}>
    <Button variant="outline" className="w-full md:w-fit">
      View your profile
    </Button>
  </Link>
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
          <Link href={paths.signIn}>
            <Button variant="outline">Sign in</Button>
          </Link>
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
          <OrganizationSwitcher
            afterCreateOrganizationUrl={paths.profile.base}
            afterLeaveOrganizationUrl={paths.profile.base}
            afterSelectOrganizationUrl={paths.profile.base}
            appearance={{
              elements: {
                rootBox: 'flex justify-center',
                organizationSwitcherTrigger: 'flex justify-center'
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
                  <Link href={paths.signIn}>
                    <Button variant="outline" className="w-full">
                      Sign in
                    </Button>
                  </Link>
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
              <li className="flex justify-center">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl={paths.profile.base}
                  afterLeaveOrganizationUrl={paths.profile.base}
                  afterSelectOrganizationUrl={paths.profile.base}
                  appearance={{
                    elements: {
                      rootBox: 'flex justify-center',
                      organizationSwitcherTrigger: 'flex justify-center'
                    }
                  }}
                />
              </li>
            </SignedIn>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
};
