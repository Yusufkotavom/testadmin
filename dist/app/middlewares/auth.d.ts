import { Request, Response, NextFunction } from 'express';
export type Role = 'admin' | 'teacher' | 'parent' | 'student';
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: Role;
            };
        }
    }
}
export declare const mockAuth: (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireRoles: (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map