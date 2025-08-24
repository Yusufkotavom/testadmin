import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { subjectSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

router.get('/', (_req, res) => res.json(ok(list(db.subjects))));

router.post('/', validateBody(subjectSchema), (req, res) => {
  const created = insert(db.subjects, req.body);
  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const item = getById(db.subjects, id);
  if (!item) return next(new HttpError(404, 'NOT_FOUND', 'Subject not found'));
  return res.json(ok(item));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(subjectSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.subjects, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Subject not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.subjects, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Subject not found'));
  return res.json(ok({ id }));
});

// Assign subject to teacher
router.post('/:id/teachers', validateParams(z.object({ id: z.string() })), validateBody(z.object({ teacherIds: z.array(z.string()) })), (req, res, next) => {
  const id = req.params.id as string;
  const subject = getById(db.subjects, id);
  if (!subject) return next(new HttpError(404, 'NOT_FOUND', 'Subject not found'));
  const updatedTeachers = req.body.teacherIds.map((tid: string) => {
    const teacher = db.teachers.get(tid);
    if (!teacher) return null;
    if (!teacher.subjectIds.includes(subject.id)) teacher.subjectIds.push(subject.id);
    db.teachers.set(tid, teacher);
    return teacher;
  }).filter(Boolean);
  return res.json(ok(updatedTeachers));
});

export default router;

