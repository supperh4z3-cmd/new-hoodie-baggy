import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export const ADMIN_COOKIE_NAME = 'baggy_admin_token';

const getJwtSecretKey = async () => {
  const secret = process.env.ADMIN_JWT_SECRET || 'baggy-street-secret-jwt-key-2026-drill-culture';
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
};

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

/**
 * Sign an admin JWT token with 7 days expiration using jose
 */
export async function signAdminToken(payload: AdminPayload): Promise<string> {
  const secretKey = await getJwtSecretKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verify and decode an admin JWT token
 */
export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const secretKey = await getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare plain password with bcrypt hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
