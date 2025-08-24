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

export default router;

