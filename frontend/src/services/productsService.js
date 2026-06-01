import { ApiErrorType, NormalizedApiError, createHttpError, mapFetchFailure } from './httpErrors.js';
import { config } from '../utils/env.js';

const DEFAULT_TIMEOUT_MS = 8000;

function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function fetchProducts({ fetcher = fetch, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(`${config.fakeStoreBaseUrl}/products`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw createHttpError(response.status);
    }

    const payload = await response.json();

    if (!Array.isArray(payload)) {
      throw new NormalizedApiError({
        type: ApiErrorType.UNKNOWN,
        message: 'The product API returned an unexpected payload.',
      });
    }

    return payload.map(normalizeProduct).filter((product) => product.id && product.title);
  } catch (error) {
    if (error instanceof NormalizedApiError) {
      throw error;
    }

    throw mapFetchFailure(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
