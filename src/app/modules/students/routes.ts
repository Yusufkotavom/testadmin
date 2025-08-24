import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { attendanceSchema, gradeSchema, studentSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

router.get('/', (_req, res) => {
  return res.json(ok(list(db.students)));
});

router.post('/', validateBody(studentSchema), (req, res) => {
  const created = insert(db.students, req.body);
  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const student = getById(db.students, id);
  if (!student) return next(new HttpError(404, 'NOT_FOUND', 'Student not found'));
  return res.json(ok(student));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(studentSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.students, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Student not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.students, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Student not found'));
  return res.json(ok({ id }));
});

// Related: grades by student
router.get('/:id/grades', validateParams(z.object({ id: z.string() })), (req, res) => {
  const grades = Array.from(db.grades.values()).filter(g => g.studentId === req.params.id);
  return res.json(ok(grades));
});

// Related: attendance by student
router.get('/:id/attendance', validateParams(z.object({ id: z.string() })), (req, res) => {
  const records = Array.from(db.attendance.values()).filter(a => a.studentId === req.params.id);
  return res.json(ok(records));
});

export default router;

