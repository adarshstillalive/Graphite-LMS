import { OAuth2Client } from 'google-auth-library';

export const signin = async (credential: string) => {
  const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.OAUTH_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email || !payload.name) {
    throw new Error('Invalid google token');
  }

  const { email, name } = payload;
  return { email, name };
};
