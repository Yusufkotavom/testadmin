import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById, Enrollment } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

export const enrollmentSchema = z.object({
  studentId: z.string(),
  classId: z.string(),
  subjectId: z.string().optional(),
});

router.get('/', (_req, res) => res.json(ok(list(db.enrollments))));

router.post('/', validateBody(enrollmentSchema), (req, res, next) => {
  const { studentId, classId, subjectId } = req.body as z.infer<typeof enrollmentSchema>;
  if (!db.students.get(studentId)) return next(new HttpError(400, 'INVALID_REF', 'Student does not exist'));
  if (!db.classes.get(classId)) return next(new HttpError(400, 'INVALID_REF', 'Class does not exist'));
  if (typeof subjectId === 'string' && !db.subjects.get(subjectId)) return next(new HttpError(400, 'INVALID_REF', 'Subject does not exist'));

  const data: Omit<Enrollment, 'id'> = typeof subjectId === 'string'
    ? { studentId, classId, subjectId }
    : { studentId, classId };

  const created = insert<Enrollment>(db.enrollments, data);

  // Also set student's classId if not already set
  const student = db.students.get(studentId);
  if (student && !student.classId) {
    student.classId = classId;
    db.students.set(studentId, student);
  }

  return res.status(201).json(ok(created));
});

router.get('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const item = getById(db.enrollments, id);
  if (!item) return next(new HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
  return res.json(ok(item));
});

router.put('/:id', validateParams(z.object({ id: z.string() })), validateBody(enrollmentSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const patch = req.body as Partial<Enrollment>;
  if (typeof patch.studentId === 'string' && !db.students.get(patch.studentId)) return next(new HttpError(400, 'INVALID_REF', 'Student does not exist'));
  if (typeof patch.classId === 'string' && !db.classes.get(patch.classId)) return next(new HttpError(400, 'INVALID_REF', 'Class does not exist'));
  if (typeof patch.subjectId === 'string' && !db.subjects.get(patch.subjectId)) return next(new HttpError(400, 'INVALID_REF', 'Subject does not exist'));

  const updated = updateById(db.enrollments, id, patch);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
  return res.json(ok(updated));
});

router.delete('/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.enrollments, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Enrollment not found'));
  return res.json(ok({ id }));
});

export default router;

