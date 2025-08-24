import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { teacherSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

router.get('/', (_req, res) => res.json(ok(list(db.teachers))));

router.post('/', validateBody(teacherSchema), (req, res) => {
  const created = insert(db.teachers, req.body);
  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const item = getById(db.teachers, id);
  if (!item) return next(new HttpError(404, 'NOT_FOUND', 'Teacher not found'));
  return res.json(ok(item));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(teacherSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.teachers, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Teacher not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.teachers, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Teacher not found'));
  return res.json(ok({ id }));
});

export default router;

