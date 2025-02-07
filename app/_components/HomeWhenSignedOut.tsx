import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { paths } from '@/lib/routes/paths';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const HomeWhenSignedOut = () => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleContinue = (closeDialog: () => void) => {
    if (code.trim()) {
      router.push(`${paths.signUp}?code=${encodeURIComponent(code.trim())}`);
      closeDialog();
    }
  };

  return (
    <section className="container mx-auto flex max-w-4xl flex-col items-center gap-6 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-12">
      <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl lg:leading-[1.1]">
        Welcome to Your Profile Management Portal
      </h1>
      <p className="max-w-xl text-center text-lg font-light text-foreground">
        Take control of your profile data. Easily update, customize, and manage
        and manage your profile information all in one place.
      </p>

      <div className="space-y-4">
        <div className="flex w-full gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Already have an account? Sign in with your existing credentials
                to access and manage your profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="default" asChild>
                <Link href={paths.signIn}>Sign in</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Got your profile code?</CardTitle>
              <CardDescription>
                <span>
                  If you have received your profile code, you can create your
                  account in minutes and start managing your profile information
                  right away.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ControlledOverlay
                title="Create account"
                size="small"
                triggerNode={
                  <Button variant="default">Create account</Button>
                }
                render={({ closeDialog }) => (
                  <div className="flex flex-col gap-4">
                      <Label htmlFor="code">Profile Code</Label>
                      <Input
                        id="code"
                        placeholder="Enter your profile code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleContinue(closeDialog);
                          }
                        }}
                      />
                    <Button
                      className="w-full"
                      onClick={() => handleContinue(closeDialog)}
                    >
                      Continue
                    </Button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Haven&apos;t got your code yet?</CardTitle>
            <CardDescription>
              <span>
                If you haven&apos;t received your profile code yet, you can join
                our waitlist to get early access to the portal and be notified
                when your code is ready.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" asChild>
              <Link href={paths.externalUrls.claimProfile}>
                Join the waitlist
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
