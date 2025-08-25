import { z } from 'zod';
declare const router: import("express-serve-static-core").Router;
export declare const enrollmentSchema: z.ZodObject<{
    studentId: z.ZodString;
    classId: z.ZodString;
    subjectId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=routes.d.ts.map