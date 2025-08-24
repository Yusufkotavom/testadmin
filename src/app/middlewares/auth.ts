import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../core/http';

export type Role = 'admin' | 'teacher' | 'parent' | 'student';

declare global {
  namespace Express {
    // Augment Request with user
    interface Request {
      user?: { id: string; role: Role };
    }
  }
}

// Mock auth: read x-user-id and x-user-role headers
export const mockAuth = (req: Request, _res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') || 'mock-user';
  const role = (req.header('x-user-role') as Role) || 'admin';
  req.user = { id: userId, role };
  next();
};

export const requireRoles = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return next(new HttpError(401, 'UNAUTHORIZED', 'Authentication required'));
  }
  if (!roles.includes(user.role)) {
    return next(new HttpError(403, 'FORBIDDEN', 'Insufficient permissions'));
  }
  next();
};

