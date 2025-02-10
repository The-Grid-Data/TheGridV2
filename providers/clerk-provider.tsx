'use client';

import {
    ClerkProvider as BaseClerkProvider,
    useAuth,
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
    rootId?: string;
    signupSource?: string;
  };
} | null;

type ProfileMetadata = {
  id: string;
  rootId: string;
  name: string;
  slug: string;
} | null;

export type ClerkContextType = {
  profileMetadata: ProfileMetadata;
  userMetadata: UserMetadata;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  getToken: () => Promise<string>;
};

export const ClerkContext = createContext<ClerkContextType>({
  profileMetadata: null,
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
  const { isLoaded: isUserLoaded, user } = useUser();
  const [token, setToken] = useState<string | null>(null);

  const isLoading = !isAuthLoaded || !isUserLoaded;
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

  const userMetadata = user
    ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? '',
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        publicMetadata: user.publicMetadata as {
          rootId?: string;
          signupSource?: string;
        }
      }
    : null;

  const profileMetadata = userMetadata?.publicMetadata?.rootId
    ? {
        id: userMetadata.id,
        rootId: userMetadata.publicMetadata.rootId,
        name: `${userMetadata.firstName || ''} ${userMetadata.lastName || ''}`.trim(),
        slug: 'default'
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
        profileMetadata,
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

export function useClerkContext() {
  return useContext(ClerkContext);
}

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <BaseClerkProvider>
      <ClerkContextProvider>{children}</ClerkContextProvider>
    </BaseClerkProvider>
  );
}
