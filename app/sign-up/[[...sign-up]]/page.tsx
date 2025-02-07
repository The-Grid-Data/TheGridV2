import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - TheGrid',
  description: 'Create your account'
};

export default async function SignUpPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const code = searchParams.code as string | undefined;

  return (
    <div className="flex min-h-screen items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90',
                footerActionLink: 'text-primary hover:text-primary/90'
              }
            }}
            unsafeMetadata={{
              // Note: For production, you should validate this code
              // and move it to publicMetadata after sign-up using
              // Clerk's Backend API or webhooks
              rootId: code || '',
              signupSource: 'web'
            }}
          />
        </div>
      </div>
    </div>
  );
}
