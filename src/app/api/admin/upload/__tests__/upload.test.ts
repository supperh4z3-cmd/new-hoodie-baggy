import { describe, it, expect, vi } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';
import * as auth from '@/lib/auth';

describe('Admin Media Upload API', () => {
  it('should return 401 when no admin token is present', async () => {
    const req = new NextRequest('http://localhost:3000/api/admin/upload', {
      method: 'POST',
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain('Yetkisiz');
  });

  it('should return 400 when no file is uploaded', async () => {
    vi.spyOn(auth, 'verifyAdminToken').mockResolvedValueOnce({
      id: 'admin_1',
      email: 'admin@baggystreet.com',
      name: 'Admin',
      role: 'superadmin',
    });

    const emptyFormData = new FormData();
    const req = new NextRequest(
      new Request('http://localhost:3000/api/admin/upload', {
        method: 'POST',
        body: emptyFormData,
        headers: {
          cookie: `${auth.ADMIN_COOKIE_NAME}=mock_token`,
        },
      })
    );

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Yüklenecek dosya seçilmedi');
  });
});
