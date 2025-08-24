"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = exports.notificationSchema = exports.timetableSchema = exports.blogPostSchema = exports.invoiceSchema = exports.feeStructureSchema = exports.attendanceSchema = exports.gradeSchema = exports.subjectSchema = exports.classSchema = exports.teacherSchema = exports.parentSchema = exports.studentSchema = exports.idParamSchema = void 0;
const zod_1 = require("zod");
const http_1 = require("../core/http");
exports.idParamSchema = zod_1.z.object({ id: zod_1.z.string().min(1) });
exports.studentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    classId: zod_1.z.string().optional(),
    parentIds: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.parentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    studentIds: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.teacherSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    subjectIds: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.classSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    gradeLevel: zod_1.z.string().min(1),
    teacherId: zod_1.z.string().optional(),
});
exports.subjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().min(1),
});
exports.gradeSchema = zod_1.z.object({
    studentId: zod_1.z.string(),
    subjectId: zod_1.z.string(),
    score: zod_1.z.number().min(0).max(100),
    term: zod_1.z.string(),
});
exports.attendanceSchema = zod_1.z.object({
    studentId: zod_1.z.string(),
    date: zod_1.z.string(),
    status: zod_1.z.enum(['present', 'absent', 'late']),
});
exports.feeStructureSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    amount: zod_1.z.number().min(0),
    gradeLevel: zod_1.z.string().optional(),
});
exports.invoiceSchema = zod_1.z.object({
    studentId: zod_1.z.string(),
    feeStructureId: zod_1.z.string(),
    amount: zod_1.z.number().min(0),
    status: zod_1.z.enum(['unpaid', 'paid', 'partial']).default('unpaid'),
    issuedAt: zod_1.z.string(),
    paidAt: zod_1.z.string().optional(),
});
exports.blogPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    authorId: zod_1.z.string(),
    published: zod_1.z.boolean().default(false),
});
exports.timetableSchema = zod_1.z.object({
    classId: zod_1.z.string(),
    subjectId: zod_1.z.string(),
    teacherId: zod_1.z.string(),
    dayOfWeek: zod_1.z.number().min(0).max(6),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
});
exports.notificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    message: zod_1.z.string().min(1),
    audience: zod_1.z.enum(['all', 'teachers', 'parents', 'students']).default('all'),
});
const validateBody = (schema) => (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return next(new http_1.HttpError(400, 'VALIDATION_ERROR', 'Invalid request body', parsed.error.flatten()));
    }
    req.body = parsed.data;
    next();
};
exports.validateBody = validateBody;
const validateParams = (schema) => (req, _res, next) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
        return next(new http_1.HttpError(400, 'VALIDATION_ERROR', 'Invalid URL params', parsed.error.flatten()));
    }
    req.params = parsed.data;
    next();
};
exports.validateParams = validateParams;
const validateQuery = (schema) => (req, _res, next) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
        return next(new http_1.HttpError(400, 'VALIDATION_ERROR', 'Invalid query params', parsed.error.flatten()));
    }
    req.query = parsed.data;
    next();
};
exports.validateQuery = validateQuery;
//# sourceMappingURL=validators.js.map