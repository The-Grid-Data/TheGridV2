'use client';

import {
  ClerkProvider,
  useAuth,
  useOrganization,
  useUser
} from '@clerk/nextjs';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

type UserMetadata = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  publicMetadata?: {
    user_id?: string;
    email?: string;
    api_key?: string;
  };
} | null;

type OrganizationMetadata = {
  id: string;
  slug: string;
  name: string;
  rootId: string;
} | null;

export type ClerkContextType = {
  organizationMetadata: OrganizationMetadata;
  userMetadata: UserMetadata;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  getToken: () => Promise<string>;
};

export const ClerkContext = createContext<ClerkContextType>({
  organizationMetadata: null,
  userMetadata: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  getToken: async () => {
    throw new Error('Clerk context not initialized');
  }
});

function ClerkContextProvider({ children }: { children: ReactNode }) {
  const {
    isLoaded: isAuthLoaded,
    isSignedIn,
    getToken: clerkGetToken
  } = useAuth();
  const { isLoaded: isOrgLoaded, organization } = useOrganization();
  const { isLoaded: isUserLoaded, user } = useUser();
  const [token, setToken] = useState<string | null>(null);

  const isLoading = !isAuthLoaded || !isOrgLoaded || !isUserLoaded;
  const isAuthenticated = isSignedIn ?? false;

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const jwt = await clerkGetToken();
        setToken(jwt);
      } else {
        setToken(null);
      }
    };

    void fetchToken();
  }, [isAuthenticated, clerkGetToken]);

  const organizationMetadata = organization
    ? {
        id: organization.id,
        rootId: (organization.publicMetadata?.rootId as string) ?? '',
        slug:
          typeof organization.publicMetadata?.slug === 'string'
            ? organization.publicMetadata.slug
            : 'default',
        name: organization.name
      }
    : null;

  const userMetadata = user
    ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? '',
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        publicMetadata: user.publicMetadata as {
          user_id?: string;
          email?: string;
          api_key?: string;
        }
      }
    : null;

  const getToken = useCallback(async () => {
    const newToken = await clerkGetToken();
    if (!newToken) {
      throw new Error('Failed to get authentication token');
    }
    setToken(newToken);
    return newToken;
  }, [clerkGetToken]);

  return (
    <ClerkContext.Provider
      value={{
        organizationMetadata,
        userMetadata,
        token,
        isLoading,
        isAuthenticated,
        getToken
      }}
    >
      {children}
    </ClerkContext.Provider>
  );
}

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          footerActionLink: 'text-primary hover:text-primary/90'
        }
      }}
    >
      <ClerkContextProvider>{children}</ClerkContextProvider>
    </ClerkProvider>
  );
}

export function useClerkContext() {
  const context = useContext(ClerkContext);
  if (context === undefined) {
    throw new Error(
      'useClerkContext must be used within a ClerkProviderWrapper'
    );
  }
  return context;
}
