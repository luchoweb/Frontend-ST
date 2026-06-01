import assert from 'node:assert/strict';
import test from 'node:test';
import { ApiErrorType } from './httpErrors.js';
import { fetchProducts } from './productsService.js';

test('fetchProducts returns normalized product titles', async () => {
  const products = await fetchProducts({
    fetcher: async () => ({
      ok: true,
      json: async () => [
        { id: 1, title: 'Minimal backpack', price: 42 },
        { id: 2, title: 'Cotton jacket', description: 'Ignored by the UI' },
      ],
    }),
  });

  assert.deepEqual(products, [
    { id: 1, title: 'Minimal backpack' },
    { id: 2, title: 'Cotton jacket' },
  ]);
});

test('fetchProducts normalizes 4xx responses as client errors', async () => {
  await assert.rejects(
    () =>
      fetchProducts({
        fetcher: async () => ({ ok: false, status: 404 }),
      }),
    (error) => {
      assert.equal(error.type, ApiErrorType.CLIENT);
      assert.equal(error.status, 404);
      return true;
    }
  );
});

test('fetchProducts normalizes network failures', async () => {
  await assert.rejects(
    () =>
      fetchProducts({
        fetcher: async () => {
          throw new TypeError('fetch failed');
        },
      }),
    (error) => {
      assert.equal(error.type, ApiErrorType.NETWORK);
      return true;
    }
  );
});
