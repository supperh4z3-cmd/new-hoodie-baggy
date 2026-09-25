import { describe, it, expect } from 'vitest';
import { signAdminToken, verifyAdminToken, hashPassword, comparePassword } from '../auth';

describe('Admin Auth Utilities', () => {
  it('should hash and compare passwords accurately', async () => {
    const raw = 'baggystreet2026!';
    const hashed = await hashPassword(raw);

    expect(hashed).not.toBe(raw);
    expect(await comparePassword(raw, hashed)).toBe(true);
    expect(await comparePassword('wrong-password', hashed)).toBe(false);
  });

  it('should sign and verify valid admin JWT token', async () => {
    const payload = {
      id: 'admin_123',
      email: 'admin@baggystreet.com',
      name: 'Super Admin',
      role: 'superadmin',
    };

    const token = await signAdminToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);

    const verified = await verifyAdminToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.id).toBe(payload.id);
    expect(verified?.email).toBe(payload.email);
    expect(verified?.role).toBe(payload.role);
  });

  it('should return null for tampered or invalid token', async () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.payload';
    const result = await verifyAdminToken(invalidToken);
    expect(result).toBeNull();
  });
});
