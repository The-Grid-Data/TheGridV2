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
  useRef,
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
  const [isPollingMetadata, setIsPollingMetadata] = useState(false);
  const pollingTimeoutRef = useRef<NodeJS.Timeout>();

  const isLoading = !isAuthLoaded || !isUserLoaded || isPollingMetadata;
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

  // Poll for metadata updates after sign-up
  useEffect(() => {
    // Cleanup function for the polling timeout
    const cleanup = () => {
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = undefined;
      }
      setIsPollingMetadata(false);
    };

    // If we already have metadata or user is not authenticated, don't poll
    if (!user || user.publicMetadata?.rootId || !isAuthenticated) {
      cleanup();
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; // Increased max attempts
    const baseInterval = 500; // Start with 500ms

    const pollMetadata = async () => {
      try {
        if (!user) {
          cleanup();
          return;
        }

        setIsPollingMetadata(true);
        await user.reload();

        // Check if metadata is available after reload
        if (user.publicMetadata?.rootId) {
          cleanup();
          return;
        }

        attempts++;
        if (attempts >= maxAttempts) {
          console.error('Failed to load user metadata after maximum attempts');
          cleanup();
          return;
        }

        // Exponential backoff with a maximum of 2 seconds
        const nextInterval = Math.min(baseInterval * Math.pow(1.5, attempts), 2000);
        pollingTimeoutRef.current = setTimeout(pollMetadata, nextInterval);
      } catch (error) {
        console.error('Error polling metadata:', error);
        cleanup();
      }
    };

    void pollMetadata();

    // Cleanup on unmount or when dependencies change
    return cleanup;
  }, [user, isAuthenticated]);

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
    if (!token) {
      const newToken = await clerkGetToken();
      if (!newToken) {
        throw new Error('Failed to get authentication token');
      }
      setToken(newToken);
      return newToken;
    }
    return token;
  }, [token, clerkGetToken]);

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
