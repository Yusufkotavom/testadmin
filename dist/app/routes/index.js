"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const routes_1 = __importDefault(require("../modules/students/routes"));
const routes_2 = __importDefault(require("../modules/parents/routes"));
const routes_3 = __importDefault(require("../modules/teachers/routes"));
const routes_4 = __importDefault(require("../modules/classes/routes"));
const routes_5 = __importDefault(require("../modules/subjects/routes"));
const routes_6 = __importDefault(require("../modules/grades/routes"));
const routes_7 = __importDefault(require("../modules/attendance/routes"));
const routes_8 = __importDefault(require("../modules/finance/routes"));
const routes_9 = __importDefault(require("../modules/blog/routes"));
const routes_10 = __importDefault(require("../modules/timetable/routes"));
const routes_11 = __importDefault(require("../modules/notifications/routes"));
const routes_12 = __importDefault(require("../modules/dashboard/routes"));
const routes_13 = __importDefault(require("../modules/enrollments/routes"));
const mockDb_1 = require("../utils/mockDb");
exports.router = (0, express_1.Router)();
exports.router.use('/students', (0, auth_1.requireRoles)('admin', 'teacher'), routes_1.default);
exports.router.use('/parents', (0, auth_1.requireRoles)('admin', 'teacher'), routes_2.default);
exports.router.use('/teachers', (0, auth_1.requireRoles)('admin'), routes_3.default);
exports.router.use('/classes', (0, auth_1.requireRoles)('admin', 'teacher'), routes_4.default);
exports.router.use('/subjects', (0, auth_1.requireRoles)('admin', 'teacher'), routes_5.default);
exports.router.use('/grades', (0, auth_1.requireRoles)('admin', 'teacher'), routes_6.default);
exports.router.use('/attendance', (0, auth_1.requireRoles)('admin', 'teacher'), routes_7.default);
exports.router.use('/finance', (0, auth_1.requireRoles)('admin'), routes_8.default);
exports.router.use('/blog', (0, auth_1.requireRoles)('admin', 'teacher'), routes_9.default);
exports.router.use('/timetable', (0, auth_1.requireRoles)('admin', 'teacher'), routes_10.default);
exports.router.use('/notifications', (0, auth_1.requireRoles)('admin', 'teacher'), routes_11.default);
exports.router.use('/dashboard', (0, auth_1.requireRoles)('admin', 'teacher', 'parent', 'student'), routes_12.default);
exports.router.use('/enrollments', (0, auth_1.requireRoles)('admin', 'teacher'), routes_13.default);
exports.router.get('/me', (0, auth_1.requireRoles)('admin', 'teacher', 'parent', 'student'), (req, res) => {
    const user = req.user;
    if (user.role === 'student') {
        const student = mockDb_1.db.students.get(user.id);
        const classRoom = student?.classId ? mockDb_1.db.classes.get(student.classId) : undefined;
        const grades = Array.from(mockDb_1.db.grades.values()).filter(g => g.studentId === user.id);
        const attendance = Array.from(mockDb_1.db.attendance.values()).filter(a => a.studentId === user.id);
        const invoices = Array.from(mockDb_1.db.invoices.values()).filter(i => i.studentId === user.id);
        const timetable = classRoom ? Array.from(mockDb_1.db.timetable.values()).filter(t => t.classId === classRoom.id) : [];
        return res.json({ success: true, data: { user, student, class: classRoom, grades, attendance, invoices, timetable } });
    }
    if (user.role === 'parent') {
        const parent = mockDb_1.db.parents.get(user.id);
        const students = parent ? parent.studentIds.map(id => mockDb_1.db.students.get(id)).filter(Boolean) : [];
        const invoices = students.flatMap(s => Array.from(mockDb_1.db.invoices.values()).filter(i => i.studentId === s.id));
        return res.json({ success: true, data: { user, parent, students, invoices } });
    }
    if (user.role === 'teacher') {
        const teacher = mockDb_1.db.teachers.get(user.id);
        const subjects = teacher ? teacher.subjectIds.map(id => mockDb_1.db.subjects.get(id)).filter(Boolean) : [];
        const classes = Array.from(mockDb_1.db.classes.values()).filter(c => c.teacherId === user.id);
        const timetable = Array.from(mockDb_1.db.timetable.values()).filter(t => t.teacherId === user.id);
        return res.json({ success: true, data: { user, teacher, subjects, classes, timetable } });
    }
    // admin
    const totals = {
        students: mockDb_1.db.students.size,
        parents: mockDb_1.db.parents.size,
        teachers: mockDb_1.db.teachers.size,
        classes: mockDb_1.db.classes.size,
        subjects: mockDb_1.db.subjects.size,
    };
    return res.json({ success: true, data: { user, totals } });
});
exports.default = exports.router;
//# sourceMappingURL=index.js.map