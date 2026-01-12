import { QueryError } from 'mysql2';

export function isQueryError(error: unknown): error is QueryError {
  return typeof error === 'object' && error !== null && 'code' in error && 'errno' in error;
}
