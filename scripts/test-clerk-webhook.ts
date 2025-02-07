import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || 'whsec_1234567890';

// Function to generate a timestamp 5 minutes in the future
const generateTimestamp = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  return Math.floor(now.getTime() / 1000);
};

// Function to generate a random ID
const generateId = () => crypto.randomBytes(16).toString('hex');

// Sample user.created event payload
const payload = {
  data: {
    id: generateId(),
    object: 'user',
    unsafe_metadata: {
      rootId: 'test-root-id-123',
      signupSource: 'web'
    }
  },
  object: 'event',
  type: 'user.created'
};

async function main() {
  try {
    // Generate headers
    const timestamp = generateTimestamp();
    const messageId = generateId();
    const payloadString = JSON.stringify(payload);

    // Create HMAC
    const toSign = `${messageId}.${timestamp}.${payloadString}`;
    const signature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(toSign)
      .digest('hex');

    // Prepare headers with Clerk's expected format
    const headers = {
      'svix-id': messageId,
      'svix-timestamp': timestamp.toString(),
      'svix-signature': `t=${timestamp},s=${signature}`,
      'Content-Type': 'application/json'
    };

    console.log('Making request to webhook endpoint...');
    console.log('Headers:', {
      ...headers,
      'svix-signature': headers['svix-signature']
    });
    console.log('Payload:', payload);
    console.log('Verification data:', {
      toSign,
      signature,
      secret: WEBHOOK_SECRET.slice(0, 4) + '...'
    });

    // Make the request to your local webhook endpoint
    const response = await fetch('http://localhost:3000/api/webhooks/clerk', {
      method: 'POST',
      headers,
      body: payloadString
    });

    // Log the response
    console.log('Status:', response.status);
    console.log('Response:', await response.text());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
main();
