"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMockData = void 0;
const mockDb_1 = require("./mockDb");
let seeded = false;
const seedMockData = () => {
    if (seeded)
        return;
    seeded = true;
    // Teachers
    const t1 = (0, mockDb_1.insert)(mockDb_1.db.teachers, { name: 'Alice Teacher', email: 'alice@school.test', subjectIds: [] });
    const t2 = (0, mockDb_1.insert)(mockDb_1.db.teachers, { name: 'Bob Teacher', email: 'bob@school.test', subjectIds: [] });
    // Subjects
    const sMath = (0, mockDb_1.insert)(mockDb_1.db.subjects, { name: 'Mathematics', code: 'MATH' });
    const sEng = (0, mockDb_1.insert)(mockDb_1.db.subjects, { name: 'English', code: 'ENG' });
    // Assign subjects to teachers
    t1.subjectIds.push(sMath.id);
    t2.subjectIds.push(sEng.id);
    mockDb_1.db.teachers.set(t1.id, t1);
    mockDb_1.db.teachers.set(t2.id, t2);
    // Classes
    const c1 = (0, mockDb_1.insert)(mockDb_1.db.classes, { name: 'Class A', gradeLevel: 'Grade 5', teacherId: t1.id });
    const c2 = (0, mockDb_1.insert)(mockDb_1.db.classes, { name: 'Class B', gradeLevel: 'Grade 6', teacherId: t2.id });
    // Parents
    const p1 = (0, mockDb_1.insert)(mockDb_1.db.parents, { name: 'Parent One', email: 'parent1@home.test', studentIds: [] });
    // Students
    const st1 = (0, mockDb_1.insert)(mockDb_1.db.students, { name: 'John Student', email: 'john@student.test', classId: c1.id, parentIds: [p1.id] });
    const st2 = (0, mockDb_1.insert)(mockDb_1.db.students, { name: 'Jane Student', email: 'jane@student.test', classId: c2.id, parentIds: [p1.id] });
    p1.studentIds.push(st1.id, st2.id);
    mockDb_1.db.parents.set(p1.id, p1);
    // Timetable
    (0, mockDb_1.insert)(mockDb_1.db.timetable, { classId: c1.id, subjectId: sMath.id, teacherId: t1.id, dayOfWeek: 1, startTime: '09:00', endTime: '10:00' });
    (0, mockDb_1.insert)(mockDb_1.db.timetable, { classId: c1.id, subjectId: sEng.id, teacherId: t2.id, dayOfWeek: 3, startTime: '10:00', endTime: '11:00' });
    // Attendance
    const today = new Date().toISOString().slice(0, 10);
    (0, mockDb_1.insert)(mockDb_1.db.attendance, { studentId: st1.id, date: `${today}T08:00:00.000Z`, status: 'present' });
    (0, mockDb_1.insert)(mockDb_1.db.attendance, { studentId: st2.id, date: `${today}T08:00:00.000Z`, status: 'late' });
    // Grades
    (0, mockDb_1.insert)(mockDb_1.db.grades, { studentId: st1.id, subjectId: sMath.id, score: 92, term: '2025-Q1' });
    (0, mockDb_1.insert)(mockDb_1.db.grades, { studentId: st2.id, subjectId: sEng.id, score: 85, term: '2025-Q1' });
    // Finance
    const fs1 = (0, mockDb_1.insert)(mockDb_1.db.feeStructures, { name: 'Tuition G5', amount: 500, gradeLevel: 'Grade 5' });
    const fs2 = (0, mockDb_1.insert)(mockDb_1.db.feeStructures, { name: 'Tuition G6', amount: 600, gradeLevel: 'Grade 6' });
    (0, mockDb_1.insert)(mockDb_1.db.invoices, { studentId: st1.id, feeStructureId: fs1.id, amount: 500, status: 'paid', issuedAt: new Date().toISOString(), paidAt: new Date().toISOString() });
    (0, mockDb_1.insert)(mockDb_1.db.invoices, { studentId: st2.id, feeStructureId: fs2.id, amount: 600, status: 'unpaid', issuedAt: new Date().toISOString() });
    // Blog/Notifications
    (0, mockDb_1.insert)(mockDb_1.db.blogPosts, { title: 'Welcome Back!', content: 'New term starts.', authorId: t1.id, published: true, createdAt: new Date().toISOString() });
    (0, mockDb_1.insert)(mockDb_1.db.notifications, { title: 'PTA Meeting', message: 'Next Friday 5PM', audience: 'parents', createdAt: new Date().toISOString() });
};
exports.seedMockData = seedMockData;
//# sourceMappingURL=seed.js.map