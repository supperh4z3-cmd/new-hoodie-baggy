import { describe, it, expect } from 'vitest';
import { GET as getProducts } from '../route';
import { GET as getProductBySlug } from '../[slug]/route';
import { NextRequest } from 'next/server';

describe('Public Products API', () => {
  it('GET /api/products returns products list successfully', async () => {
    const req = new NextRequest('http://localhost:3000/api/products');
    const res = await getProducts(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThan(0);
  });

  it('GET /api/products/[slug] returns 404 for nonexistent product', async () => {
    const req = new NextRequest('http://localhost:3000/api/products/non-existent-item-999');
    const res = await getProductBySlug(req, {
      params: Promise.resolve({ slug: 'non-existent-item-999' }),
    });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBeDefined();
  });
});
