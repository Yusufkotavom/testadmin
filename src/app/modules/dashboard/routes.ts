import { Router } from 'express';
import { ok } from '../../core/http';
import { db } from '../../utils/mockDb';
import dayjs from 'dayjs';

const router = Router();

router.get('/', (_req, res) => {
  const today = dayjs().format('YYYY-MM-DD');
  const invoices = Array.from(db.invoices.values());
  const revenueTotal = invoices.filter(i => i.status !== 'unpaid').reduce((sum, i) => sum + i.amount, 0);
  const unpaidTotal = invoices.filter(i => i.status === 'unpaid').reduce((sum, i) => sum + i.amount, 0);

  const attendanceByDay: Record<string, { present: number; absent: number; late: number }> = {};
  for (const a of db.attendance.values()) {
    const d = a.date.slice(0, 10);
    attendanceByDay[d] ||= { present: 0, absent: 0, late: 0 };
    attendanceByDay[d][a.status]++;
  }

  const totals = {
    students: db.students.size,
    parents: db.parents.size,
    teachers: db.teachers.size,
    classes: db.classes.size,
    subjects: db.subjects.size,
    invoicesUnpaidCount: invoices.filter(i => i.status !== 'paid').length,
    revenueTotal,
    unpaidTotal,
    posts: db.blogPosts.size,
    notifications: db.notifications.size,
    attendanceToday: Array.from(db.attendance.values()).filter(a => a.date.startsWith(today)).length,
    attendanceByDay,
  };

  return res.json(ok({ totals }));
});

export default router;

