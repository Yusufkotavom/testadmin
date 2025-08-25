"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_1 = require("../../core/http");
const mockDb_1 = require("../../utils/mockDb");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    const totals = {
        students: mockDb_1.db.students.size,
        parents: mockDb_1.db.parents.size,
        teachers: mockDb_1.db.teachers.size,
        classes: mockDb_1.db.classes.size,
        subjects: mockDb_1.db.subjects.size,
        invoicesUnpaid: Array.from(mockDb_1.db.invoices.values()).filter(i => i.status !== 'paid').length,
        posts: mockDb_1.db.blogPosts.size,
        notifications: mockDb_1.db.notifications.size,
        attendanceToday: Array.from(mockDb_1.db.attendance.values()).filter(a => a.date.startsWith(new Date().toISOString().slice(0, 10))).length,
    };
    return res.json((0, http_1.ok)({ totals }));
});
exports.default = router;
//# sourceMappingURL=routes.js.map