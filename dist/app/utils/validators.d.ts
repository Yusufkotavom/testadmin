import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const studentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    classId: z.ZodOptional<z.ZodString>;
    parentIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const parentSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    studentIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const teacherSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    subjectIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const classSchema: z.ZodObject<{
    name: z.ZodString;
    gradeLevel: z.ZodString;
    teacherId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const subjectSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
}, z.core.$strip>;
export declare const gradeSchema: z.ZodObject<{
    studentId: z.ZodString;
    subjectId: z.ZodString;
    score: z.ZodNumber;
    term: z.ZodString;
}, z.core.$strip>;
export declare const attendanceSchema: z.ZodObject<{
    studentId: z.ZodString;
    date: z.ZodString;
    status: z.ZodEnum<{
        present: "present";
        absent: "absent";
        late: "late";
    }>;
}, z.core.$strip>;
export declare const feeStructureSchema: z.ZodObject<{
    name: z.ZodString;
    amount: z.ZodNumber;
    gradeLevel: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const invoiceSchema: z.ZodObject<{
    studentId: z.ZodString;
    feeStructureId: z.ZodString;
    amount: z.ZodNumber;
    status: z.ZodDefault<z.ZodEnum<{
        unpaid: "unpaid";
        paid: "paid";
        partial: "partial";
    }>>;
    issuedAt: z.ZodString;
    paidAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const blogPostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
    published: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const timetableSchema: z.ZodObject<{
    classId: z.ZodString;
    subjectId: z.ZodString;
    teacherId: z.ZodString;
    dayOfWeek: z.ZodNumber;
    startTime: z.ZodString;
    endTime: z.ZodString;
}, z.core.$strip>;
export declare const notificationSchema: z.ZodObject<{
    title: z.ZodString;
    message: z.ZodString;
    audience: z.ZodDefault<z.ZodEnum<{
        all: "all";
        teachers: "teachers";
        parents: "parents";
        students: "students";
    }>>;
}, z.core.$strip>;
export declare const validateBody: <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateParams: <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateQuery: <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validators.d.ts.map