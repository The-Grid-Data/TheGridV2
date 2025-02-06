export const paths = {
  base: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  profile: {
    base: '/profile',
    detail: (slug: string, opts?: { section?: string }) => {
      const section = opts?.section;
      return `/profiles/${slug}${section ? `#${section}` : ''}`;
    }
  },

  externalUrls: {
    claimProfile: 'https://enter.thegrid.id/claimprofile',
    termsOfService: 'https://thegrid.id/legal/web-services-terms'
  }
} as const;
