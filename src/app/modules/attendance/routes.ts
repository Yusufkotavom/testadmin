import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { attendanceSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

router.get('/', (_req, res) => res.json(ok(list(db.attendance))));

router.post('/', validateBody(attendanceSchema), (req, res) => {
  const created = insert(db.attendance, req.body);
  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const item = getById(db.attendance, id);
  if (!item) return next(new HttpError(404, 'NOT_FOUND', 'Attendance record not found'));
  return res.json(ok(item));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(attendanceSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.attendance, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Attendance record not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.attendance, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Attendance record not found'));
  return res.json(ok({ id }));
});

export default router;

