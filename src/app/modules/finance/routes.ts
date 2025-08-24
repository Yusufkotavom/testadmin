import { Router } from 'express';
import { ok, HttpError } from '../../core/http';
import { feeStructureSchema, invoiceSchema } from '../../utils/validators';
import { validateBody, validateParams } from '../../utils/validators';
import { db, insert, list, getById, updateById, removeById } from '../../utils/mockDb';
import { z } from 'zod';

const router = Router();

// Fee structures
router.get('/fees', (_req, res) => res.json(ok(list(db.feeStructures))));
router.post('/fees', validateBody(feeStructureSchema), (req, res) => {
  const created = insert(db.feeStructures, req.body);
  return res.status(201).json(ok(created));
});
router.put('/fees/:id', validateParams(z.object({ id: z.string() })), validateBody(feeStructureSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.feeStructures, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Fee structure not found'));
  return res.json(ok(updated));
});
router.delete('/fees/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.feeStructures, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Fee structure not found'));
  return res.json(ok({ id }));
});

// Invoices
router.get('/invoices', (_req, res) => res.json(ok(list(db.invoices))));
router.post('/invoices', validateBody(invoiceSchema), (req, res) => {
  const created = insert(db.invoices, req.body);
  return res.status(201).json(ok(created));
});
router.put('/invoices/:id', validateParams(z.object({ id: z.string() })), validateBody(invoiceSchema.partial()), (req, res, next) => {
  const id = req.params.id as string;
  const updated = updateById(db.invoices, id, req.body);
  if (!updated) return next(new HttpError(404, 'NOT_FOUND', 'Invoice not found'));
  return res.json(ok(updated));
});
router.delete('/invoices/:id', validateParams(z.object({ id: z.string() })), (req, res, next) => {
  const id = req.params.id as string;
  const deleted = removeById(db.invoices, id);
  if (!deleted) return next(new HttpError(404, 'NOT_FOUND', 'Invoice not found'));
  return res.json(ok({ id }));
});

export default router;

