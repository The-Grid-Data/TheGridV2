import { authMiddleware, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { paths } from './lib/routes/paths';

type PublicMetadata = {
  rootId?: string;
  signupSource?: string;
};

export default authMiddleware({
  publicRoutes: [
    '/',
    `${paths.signIn}/(.*)`,
    `${paths.signUp}/(.*)`,
    '/api/graphql'
  ],
  ignoredRoutes: ['/api/graphql', '/monitoring', '/api/webhooks/clerk'],
  async afterAuth(auth, req) {
    // If the user is not signed in, continue with the request
    if (!auth.userId) {
      return NextResponse.next();
    }

    // Only skip rootId check for API routes and verify-profile page
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/');
    const isVerifyProfileRoute = req.nextUrl.pathname === paths.verifyProfile;

    if (isApiRoute || isVerifyProfileRoute) {
      return NextResponse.next();
    }

    // Get the user's metadata
    const user = await clerkClient.users.getUser(auth.userId);
    const hasRootId = user.publicMetadata?.rootId;

    // If the user doesn't have a rootId, redirect to the verify-profile page
    if (!hasRootId) {
      const verifyProfileUrl = new URL(paths.verifyProfile, req.url);
      return NextResponse.redirect(verifyProfileUrl);
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico)(?!.*\\.).*)',
    '/api/upload',
    '/(api|trpc)(.*)'
  ]
};
