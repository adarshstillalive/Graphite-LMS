import jwt from 'jsonwebtoken';

interface Payload {
  email: string;
  role: string;
}

export const generateAccessToken = (payload: Payload) => {
  const accessToken = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return accessToken;
};

export const generateRefreshToken = (payload: Payload) => {
  const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });

  return refreshToken;
};

export const verifyRefreshToken = async (
  refreshToken: string,
): Promise<Payload> => {
  const decoded = (await jwt.verify(
    refreshToken,
    `${process.env.JWT_REFRESH_SECRET}`,
  )) as Payload;
  if (!decoded) {
    throw new Error('Unauthorized refresh token');
  }
  return decoded;
};

export const verifyAccessToken = async (
  accessToken: string,
): Promise<Payload> => {
  const decoded = (await jwt.verify(
    accessToken,
    `${process.env.JWT_SECRET}`,
  )) as Payload;

  if (!decoded) {
    throw new Error('Unauthorized access token');
  }

  return decoded;
};
