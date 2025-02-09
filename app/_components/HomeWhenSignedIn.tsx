'use client';
import { Button } from '@/components/ui/button';
import { paths } from '@/lib/routes/paths';
import { useClerkContext } from '@/providers/clerk-provider';
import Link from 'next/link';

export const HomeWhenSignedIn = () => {
  const { isLoading } = useClerkContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto flex max-w-4xl flex-col items-center gap-6 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-12">
      <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl lg:leading-[1.1]">
        Manage your profile
      </h1>
      <p className="max-w-xl text-center text-lg font-light text-foreground">
        Easily update, customize, and manage your profile information all in one
        place.
      </p>

      <Button variant="default" asChild>
        <Link href={paths.profile.base}>Go to your profile</Link>
      </Button>
    </section>
  );
};
