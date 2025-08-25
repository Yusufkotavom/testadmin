import { Request, Response, NextFunction } from 'express';
import { ApiError, HttpError } from '../core/http';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    const payload: ApiError = {
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    };
    return res.status(err.status).json(payload);
  }

  const payload: ApiError = {
    success: false,
    error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpected error occurred' },
  };
  return res.status(500).json(payload);
};

