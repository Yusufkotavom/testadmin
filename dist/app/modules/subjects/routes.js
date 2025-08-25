"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_1 = require("../../core/http");
const validators_1 = require("../../utils/validators");
const validators_2 = require("../../utils/validators");
const mockDb_1 = require("../../utils/mockDb");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => res.json((0, http_1.ok)((0, mockDb_1.list)(mockDb_1.db.subjects))));
router.post('/', (0, validators_2.validateBody)(validators_1.subjectSchema), (req, res) => {
    const created = (0, mockDb_1.insert)(mockDb_1.db.subjects, req.body);
    return res.status(201).json((0, http_1.ok)(created));
});
router.get('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const item = (0, mockDb_1.getById)(mockDb_1.db.subjects, id);
    if (!item)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Subject not found'));
    return res.json((0, http_1.ok)(item));
});
router.put('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_2.validateBody)(validators_1.subjectSchema.partial()), (req, res, next) => {
    const id = req.params.id;
    const updated = (0, mockDb_1.updateById)(mockDb_1.db.subjects, id, req.body);
    if (!updated)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Subject not found'));
    return res.json((0, http_1.ok)(updated));
});
router.delete('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const deleted = (0, mockDb_1.removeById)(mockDb_1.db.subjects, id);
    if (!deleted)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Subject not found'));
    return res.json((0, http_1.ok)({ id }));
});
// Assign subject to teacher
router.post('/:id/teachers', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_2.validateBody)(zod_1.z.object({ teacherIds: zod_1.z.array(zod_1.z.string()) })), (req, res, next) => {
    const id = req.params.id;
    const subject = (0, mockDb_1.getById)(mockDb_1.db.subjects, id);
    if (!subject)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Subject not found'));
    const updatedTeachers = req.body.teacherIds.map((tid) => {
        const teacher = mockDb_1.db.teachers.get(tid);
        if (!teacher)
            return null;
        if (!teacher.subjectIds.includes(subject.id))
            teacher.subjectIds.push(subject.id);
        mockDb_1.db.teachers.set(tid, teacher);
        return teacher;
    }).filter(Boolean);
    return res.json((0, http_1.ok)(updatedTeachers));
});
exports.default = router;
//# sourceMappingURL=routes.js.map