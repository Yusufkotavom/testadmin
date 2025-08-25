import { Router } from 'express';
import { requireRoles } from '../middlewares/auth';
import students from '../modules/students/routes';
import parents from '../modules/parents/routes';
import teachers from '../modules/teachers/routes';
import classes from '../modules/classes/routes';
import subjects from '../modules/subjects/routes';
import grades from '../modules/grades/routes';
import attendance from '../modules/attendance/routes';
import finance from '../modules/finance/routes';
import blog from '../modules/blog/routes';
import timetable from '../modules/timetable/routes';
import notifications from '../modules/notifications/routes';
import dashboard from '../modules/dashboard/routes';
import enrollments from '../modules/enrollments/routes';
import { db } from '../utils/mockDb';

export const router = Router();

router.use('/students', requireRoles('admin', 'teacher'), students);
router.use('/parents', requireRoles('admin', 'teacher'), parents);
router.use('/teachers', requireRoles('admin'), teachers);
router.use('/classes', requireRoles('admin', 'teacher'), classes);
router.use('/subjects', requireRoles('admin', 'teacher'), subjects);
router.use('/grades', requireRoles('admin', 'teacher'), grades);
router.use('/attendance', requireRoles('admin', 'teacher'), attendance);
router.use('/finance', requireRoles('admin'), finance);
router.use('/blog', requireRoles('admin', 'teacher'), blog);
router.use('/timetable', requireRoles('admin', 'teacher'), timetable);
router.use('/notifications', requireRoles('admin', 'teacher'), notifications);
router.use('/dashboard', requireRoles('admin', 'teacher', 'parent', 'student'), dashboard);
router.use('/enrollments', requireRoles('admin', 'teacher'), enrollments);

router.get('/me', requireRoles('admin', 'teacher', 'parent', 'student'), (req, res) => {
  const user = req.user!;
  if (user.role === 'student') {
    const student = db.students.get(user.id);
    const classRoom = student?.classId ? db.classes.get(student.classId) : undefined;
    const grades = Array.from(db.grades.values()).filter(g => g.studentId === user.id);
    const attendance = Array.from(db.attendance.values()).filter(a => a.studentId === user.id);
    const invoices = Array.from(db.invoices.values()).filter(i => i.studentId === user.id);
    const timetable = classRoom ? Array.from(db.timetable.values()).filter(t => t.classId === classRoom.id) : [];
    return res.json({ success: true, data: { user, student, class: classRoom, grades, attendance, invoices, timetable } });
  }
  if (user.role === 'parent') {
    const parent = db.parents.get(user.id);
    const students = parent ? parent.studentIds.map(id => db.students.get(id)).filter(Boolean) : [] as any[];
    const invoices = students.flatMap(s => Array.from(db.invoices.values()).filter(i => i.studentId === (s as any).id));
    return res.json({ success: true, data: { user, parent, students, invoices } });
  }
  if (user.role === 'teacher') {
    const teacher = db.teachers.get(user.id);
    const subjects = teacher ? teacher.subjectIds.map(id => db.subjects.get(id)).filter(Boolean) : [] as any[];
    const classes = Array.from(db.classes.values()).filter(c => c.teacherId === user.id);
    const timetable = Array.from(db.timetable.values()).filter(t => t.teacherId === user.id);
    return res.json({ success: true, data: { user, teacher, subjects, classes, timetable } });
  }
  // admin
  const totals = {
    students: db.students.size,
    parents: db.parents.size,
    teachers: db.teachers.size,
    classes: db.classes.size,
    subjects: db.subjects.size,
  };
  return res.json({ success: true, data: { user, totals } });
});

export default router;

