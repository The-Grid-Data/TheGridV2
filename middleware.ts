import { authMiddleware } from '@clerk/nextjs/server';
import { paths } from './lib/routes/paths';

export default authMiddleware({
  publicRoutes: [
    '/',
    `${paths.signIn}/(.*)`,
    `${paths.signUp}/(.*)`,
    '/api/graphql'
  ],
  ignoredRoutes: ['/api/graphql', '/monitoring', '/api/webhooks/clerk']
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
