'use client';

import { useUser } from '@clerk/nextjs';
import Intercom from '@intercom/messenger-js-sdk';
import { useEffect } from 'react';

interface IntercomSettings {
  app_id: string;
  user_id?: string;
  name?: string;
  email?: string;
  created_at?: number;
}

// Define the Intercom function type
type IntercomFunction = {
  (command: 'shutdown'): void;
  (settings: IntercomSettings): void;
}

// Add Intercom to the global window object
declare global {
  var Intercom: IntercomFunction | undefined;
}

export function IntercomProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      Intercom({
        app_id: 'w4obxz7v',
        user_id: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
        email: user.primaryEmailAddress?.emailAddress || undefined,
        created_at: Math.floor(user.createdAt ? new Date(user.createdAt).getTime() / 1000 : Date.now() / 1000),
      });
    } else {
      // Initialize Intercom for anonymous users
      Intercom({
        app_id: 'w4obxz7v',
      });
    }

    return () => {
      // Clean up Intercom when component unmounts
      if (globalThis.Intercom) {
        globalThis.Intercom('shutdown');
      }
    };
  }, [isLoaded, user]);

  return <>{children}</>;
}
