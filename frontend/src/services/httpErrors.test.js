import assert from 'node:assert/strict';
import test from 'node:test';
import { ApiErrorType, createHttpError } from './httpErrors.js';

test('createHttpError maps 5xx responses to server errors', () => {
  const error = createHttpError(503);

  assert.equal(error.type, ApiErrorType.SERVER);
  assert.equal(error.status, 503);
  assert.match(error.message, /temporarily unavailable/i);
});