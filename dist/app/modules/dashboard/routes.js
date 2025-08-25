"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_1 = require("../../core/http");
const mockDb_1 = require("../../utils/mockDb");
const dayjs_1 = __importDefault(require("dayjs"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    const today = (0, dayjs_1.default)().format('YYYY-MM-DD');
    const invoices = Array.from(mockDb_1.db.invoices.values());
    const revenueTotal = invoices.filter(i => i.status !== 'unpaid').reduce((sum, i) => sum + i.amount, 0);
    const unpaidTotal = invoices.filter(i => i.status === 'unpaid').reduce((sum, i) => sum + i.amount, 0);
    const attendanceByDay = {};
    for (const a of mockDb_1.db.attendance.values()) {
        const d = a.date.slice(0, 10);
        attendanceByDay[d] || (attendanceByDay[d] = { present: 0, absent: 0, late: 0 });
        attendanceByDay[d][a.status]++;
    }
    const totals = {
        students: mockDb_1.db.students.size,
        parents: mockDb_1.db.parents.size,
        teachers: mockDb_1.db.teachers.size,
        classes: mockDb_1.db.classes.size,
        subjects: mockDb_1.db.subjects.size,
        invoicesUnpaidCount: invoices.filter(i => i.status !== 'paid').length,
        revenueTotal,
        unpaidTotal,
        posts: mockDb_1.db.blogPosts.size,
        notifications: mockDb_1.db.notifications.size,
        attendanceToday: Array.from(mockDb_1.db.attendance.values()).filter(a => a.date.startsWith(today)).length,
        attendanceByDay,
    };
    return res.json((0, http_1.ok)({ totals }));
});
exports.default = router;
//# sourceMappingURL=routes.js.map