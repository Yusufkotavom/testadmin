"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentSchema = void 0;
const express_1 = require("express");
const http_1 = require("../../core/http");
const validators_1 = require("../../utils/validators");
const mockDb_1 = require("../../utils/mockDb");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
exports.enrollmentSchema = zod_1.z.object({
    studentId: zod_1.z.string(),
    classId: zod_1.z.string(),
    subjectId: zod_1.z.string().optional(),
});
router.get('/', (_req, res) => res.json((0, http_1.ok)((0, mockDb_1.list)(mockDb_1.db.enrollments))));
router.post('/', (0, validators_1.validateBody)(exports.enrollmentSchema), (req, res, next) => {
    const { studentId, classId, subjectId } = req.body;
    if (!mockDb_1.db.students.get(studentId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Student does not exist'));
    if (!mockDb_1.db.classes.get(classId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Class does not exist'));
    if (typeof subjectId === 'string' && !mockDb_1.db.subjects.get(subjectId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Subject does not exist'));
    const data = typeof subjectId === 'string'
        ? { studentId, classId, subjectId }
        : { studentId, classId };
    const created = (0, mockDb_1.insert)(mockDb_1.db.enrollments, data);
    // Also set student's classId if not already set
    const student = mockDb_1.db.students.get(studentId);
    if (student && !student.classId) {
        student.classId = classId;
        mockDb_1.db.students.set(studentId, student);
    }
    return res.status(201).json((0, http_1.ok)(created));
});
router.get('/:id', (0, validators_1.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const item = (0, mockDb_1.getById)(mockDb_1.db.enrollments, id);
    if (!item)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
    return res.json((0, http_1.ok)(item));
});
router.put('/:id', (0, validators_1.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_1.validateBody)(exports.enrollmentSchema.partial()), (req, res, next) => {
    const id = req.params.id;
    const patch = req.body;
    if (typeof patch.studentId === 'string' && !mockDb_1.db.students.get(patch.studentId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Student does not exist'));
    if (typeof patch.classId === 'string' && !mockDb_1.db.classes.get(patch.classId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Class does not exist'));
    if (typeof patch.subjectId === 'string' && !mockDb_1.db.subjects.get(patch.subjectId))
        return next(new http_1.HttpError(400, 'INVALID_REF', 'Subject does not exist'));
    const updated = (0, mockDb_1.updateById)(mockDb_1.db.enrollments, id, patch);
    if (!updated)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
    return res.json((0, http_1.ok)(updated));
});
router.delete('/:id', (0, validators_1.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const deleted = (0, mockDb_1.removeById)(mockDb_1.db.enrollments, id);
    if (!deleted)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
    return res.json((0, http_1.ok)({ id }));
});
exports.default = router;
//# sourceMappingURL=routes.js.map