export const ApiErrorType = Object.freeze({
  CLIENT: 'client',
  SERVER: 'server',
  NETWORK: 'network',
  TIMEOUT: 'timeout',
  UNKNOWN: 'unknown',
});

export class NormalizedApiError extends Error {
  constructor({ type, message, status = null, cause = null }) {
    super(message);
    this.name = 'NormalizedApiError';
    this.type = type;
    this.status = status;
    this.cause = cause;
  }
}

export function createHttpError(status) {
  if (status >= 400 && status < 500) {
    return new NormalizedApiError({
      type: ApiErrorType.CLIENT,
      status,
      message: `The request was rejected by the product API (${status}).`,
    });
  }

  if (status >= 500 && status < 600) {
    return new NormalizedApiError({
      type: ApiErrorType.SERVER,
      status,
      message: `The product API is temporarily unavailable (${status}).`,
    });
  }

  return new NormalizedApiError({
    type: ApiErrorType.UNKNOWN,
    status,
    message: `Unexpected response from the product API (${status}).`,
  });
}

export function mapFetchFailure(error) {
  if (error?.name === 'AbortError') {
    return new NormalizedApiError({
      type: ApiErrorType.TIMEOUT,
      message: 'The product API took too long to respond. Please retry.',
      cause: error,
    });
  }

  return new NormalizedApiError({
    type: ApiErrorType.NETWORK,
    message: 'Unable to reach the product API. Check your connection and retry.',
    cause: error,
  });
}
