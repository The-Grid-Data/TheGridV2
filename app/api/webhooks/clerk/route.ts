import { clerkClient } from '@clerk/nextjs';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

async function validateRequest(request: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headersList = await headers();
  const svix_id = headersList.get('svix-id') || '';
  const svix_timestamp = headersList.get('svix-timestamp') || '';
  const svix_signature = headersList.get('svix-signature') || '';

  console.log('Received headers:', {
    svix_id,
    svix_timestamp,
    svix_signature
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error('Missing svix headers');
  }

  // Get the body
  const payload = await request.json();
  const payloadString = JSON.stringify(payload);

  console.log('Received payload:', payloadString);

  // Verify the webhook using Svix
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payloadString, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    throw new Error('Invalid signature');
  }

  return evt;
}

export async function POST(request: Request) {
  try {
    const evt = await validateRequest(request);

    if (evt.type === 'user.created') {
      const { id, unsafe_metadata } = evt.data;

      // Extract rootId from unsafe_metadata
      const rootId = unsafe_metadata?.rootId;

      if (!rootId) {
        console.warn('No rootId found in unsafe_metadata for user:', id);
        return new Response('No rootId found', { status: 200 });
      }

      try {
        // Check if user exists
        try {
          await clerkClient.users.getUser(id);
        } catch (error) {
          console.log('User not found, this is expected in test environment');
          return new Response('Webhook signature verified successfully', {
            status: 200
          });
        }

        // Move rootId to publicMetadata
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            rootId,
            signupSource: unsafe_metadata?.signupSource || 'web'
          }
        });

        // Clear the unsafe metadata
        await clerkClient.users.updateUser(id, {
          unsafeMetadata: {}
        });

        console.log(
          'Successfully moved rootId to publicMetadata for user:',
          id
        );
        return new Response('Webhook processed successfully', { status: 200 });
      } catch (error) {
        console.error('Error updating user metadata:', error);
        throw new Error('Failed to update user metadata');
      }
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      error instanceof Error ? error.message : 'Error processing webhook',
      { status: 401 }
    );
  }
}
