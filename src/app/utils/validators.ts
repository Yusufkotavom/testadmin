import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../core/http';

export const idParamSchema = z.object({ id: z.string().min(1) });

export const studentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  classId: z.string().optional(),
  parentIds: z.array(z.string()).default([]),
});

export const parentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  studentIds: z.array(z.string()).default([]),
});

export const teacherSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subjectIds: z.array(z.string()).default([]),
});

export const classSchema = z.object({
  name: z.string().min(1),
  gradeLevel: z.string().min(1),
  teacherId: z.string().optional(),
});

export const subjectSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
});

export const gradeSchema = z.object({
  studentId: z.string(),
  subjectId: z.string(),
  score: z.number().min(0).max(100),
  term: z.string(),
});

export const attendanceSchema = z.object({
  studentId: z.string(),
  date: z.string(),
  status: z.enum(['present', 'absent', 'late']),
});

export const feeStructureSchema = z.object({
  name: z.string().min(1),
  amount: z.number().min(0),
  gradeLevel: z.string().optional(),
});

export const invoiceSchema = z.object({
  studentId: z.string(),
  feeStructureId: z.string(),
  amount: z.number().min(0),
  status: z.enum(['unpaid', 'paid', 'partial']).default('unpaid'),
  issuedAt: z.string(),
  paidAt: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.string(),
  published: z.boolean().default(false),
});

export const timetableSchema = z.object({
  classId: z.string(),
  subjectId: z.string(),
  teacherId: z.string(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
});

export const notificationSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  audience: z.enum(['all', 'teachers', 'parents', 'students']).default('all'),
});

export const validateBody = <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return next(new HttpError(400, 'VALIDATION_ERROR', 'Invalid request body', parsed.error.flatten()));
  }
  req.body = parsed.data;
  next();
};

export const validateParams = <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.params);
  if (!parsed.success) {
    return next(new HttpError(400, 'VALIDATION_ERROR', 'Invalid URL params', parsed.error.flatten()));
  }
  req.params = parsed.data as any;
  next();
};

export const validateQuery = <T extends z.ZodTypeAny>(schema: T) => (req: Request, _res: Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    return next(new HttpError(400, 'VALIDATION_ERROR', 'Invalid query params', parsed.error.flatten()));
  }
  req.query = parsed.data as any;
  next();
};

