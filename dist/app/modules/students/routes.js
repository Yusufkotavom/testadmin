"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_1 = require("../../core/http");
const validators_1 = require("../../utils/validators");
const validators_2 = require("../../utils/validators");
const mockDb_1 = require("../../utils/mockDb");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    return res.json((0, http_1.ok)((0, mockDb_1.list)(mockDb_1.db.students)));
});
router.post('/', (0, validators_2.validateBody)(validators_1.studentSchema), (req, res) => {
    const created = (0, mockDb_1.insert)(mockDb_1.db.students, req.body);
    return res.status(201).json((0, http_1.ok)(created));
});
router.get('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const student = (0, mockDb_1.getById)(mockDb_1.db.students, id);
    if (!student)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Student not found'));
    return res.json((0, http_1.ok)(student));
});
router.put('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_2.validateBody)(validators_1.studentSchema.partial()), (req, res, next) => {
    const id = req.params.id;
    const updated = (0, mockDb_1.updateById)(mockDb_1.db.students, id, req.body);
    if (!updated)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Student not found'));
    return res.json((0, http_1.ok)(updated));
});
router.delete('/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const deleted = (0, mockDb_1.removeById)(mockDb_1.db.students, id);
    if (!deleted)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Student not found'));
    return res.json((0, http_1.ok)({ id }));
});
// Related: grades by student
router.get('/:id/grades', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res) => {
    const grades = Array.from(mockDb_1.db.grades.values()).filter(g => g.studentId === req.params.id);
    return res.json((0, http_1.ok)(grades));
});
// Related: attendance by student
router.get('/:id/attendance', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res) => {
    const records = Array.from(mockDb_1.db.attendance.values()).filter(a => a.studentId === req.params.id);
    return res.json((0, http_1.ok)(records));
});
exports.default = router;
//# sourceMappingURL=routes.js.map