import { ZodError } from 'zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ErrorHandler = (error: unknown) => string;

export const errorHandler: ErrorHandler = (error) => {
  if (error instanceof ZodError) {
    return error.errors.map((e) => e.message).join(', ');
  }

  if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data) {
      return (fetchError.data as { message: string }).message;
    }
    return `Fetch error: ${fetchError.status}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred.';
};

export default errorHandler;
