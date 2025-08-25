import { Router } from 'express';
import { ok } from '../../core/http';
import { db } from '../../utils/mockDb';

const router = Router();

router.get('/', (_req, res) => {
  const totals = {
    students: db.students.size,
    parents: db.parents.size,
    teachers: db.teachers.size,
    classes: db.classes.size,
    subjects: db.subjects.size,
    invoicesUnpaid: Array.from(db.invoices.values()).filter(i => i.status !== 'paid').length,
    posts: db.blogPosts.size,
    notifications: db.notifications.size,
    attendanceToday: Array.from(db.attendance.values()).filter(a => a.date.startsWith(new Date().toISOString().slice(0,10))).length,
  };

  return res.json(ok({ totals }));
});

export default router;

