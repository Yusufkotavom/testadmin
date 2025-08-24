import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { classSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

router.get('/', (_req, res) => res.json(ok(list(db.classes))));

router.post('/', validateBody(classSchema), (req, res) => {
  const created = insert(db.classes, req.body);
  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const item = getById(db.classes, id);
  if (!item) return next(new HttpError(404, 'NOT_FOUND', 'Class not found'));
  return res.json(ok(item));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(classSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.classes, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Class not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.classes, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Class not found'));
  return res.json(ok({ id }));
});

// Map students to class
router.post('/:id/students', validateParams(z.object({ id: z.string() })), validateBody(z.object({ studentIds: z.array(z.string()) })), (req, res, next) => {
  const id = req.params.id as string;
  const clazz = getById(db.classes, id);
  if (!clazz) return next(new HttpError(404, 'NOT_FOUND', 'Class not found'));
  const updatedStudents = req.body.studentIds.map((studentId: string) => {
    const student = db.students.get(studentId);
    if (!student) return null;
    student.classId = id;
    db.students.set(studentId, student);
    return student;
  }).filter(Boolean);
  return res.json(ok(updatedStudents));
});

export default router;

