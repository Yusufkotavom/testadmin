"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_1 = require("../../core/http");
const validators_1 = require("../../utils/validators");
const validators_2 = require("../../utils/validators");
const mockDb_1 = require("../../utils/mockDb");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
// Fee structures
router.get('/fees', (_req, res) => res.json((0, http_1.ok)((0, mockDb_1.list)(mockDb_1.db.feeStructures))));
router.post('/fees', (0, validators_2.validateBody)(validators_1.feeStructureSchema), (req, res) => {
    const created = (0, mockDb_1.insert)(mockDb_1.db.feeStructures, req.body);
    return res.status(201).json((0, http_1.ok)(created));
});
router.put('/fees/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_2.validateBody)(validators_1.feeStructureSchema.partial()), (req, res, next) => {
    const id = req.params.id;
    const updated = (0, mockDb_1.updateById)(mockDb_1.db.feeStructures, id, req.body);
    if (!updated)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Fee structure not found'));
    return res.json((0, http_1.ok)(updated));
});
router.delete('/fees/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const deleted = (0, mockDb_1.removeById)(mockDb_1.db.feeStructures, id);
    if (!deleted)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Fee structure not found'));
    return res.json((0, http_1.ok)({ id }));
});
// Invoices
router.get('/invoices', (_req, res) => res.json((0, http_1.ok)((0, mockDb_1.list)(mockDb_1.db.invoices))));
router.post('/invoices', (0, validators_2.validateBody)(validators_1.invoiceSchema), (req, res) => {
    const created = (0, mockDb_1.insert)(mockDb_1.db.invoices, req.body);
    return res.status(201).json((0, http_1.ok)(created));
});
router.put('/invoices/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (0, validators_2.validateBody)(validators_1.invoiceSchema.partial()), (req, res, next) => {
    const id = req.params.id;
    const updated = (0, mockDb_1.updateById)(mockDb_1.db.invoices, id, req.body);
    if (!updated)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Invoice not found'));
    return res.json((0, http_1.ok)(updated));
});
router.delete('/invoices/:id', (0, validators_2.validateParams)(zod_1.z.object({ id: zod_1.z.string() })), (req, res, next) => {
    const id = req.params.id;
    const deleted = (0, mockDb_1.removeById)(mockDb_1.db.invoices, id);
    if (!deleted)
        return next(new http_1.HttpError(404, 'NOT_FOUND', 'Invoice not found'));
    return res.json((0, http_1.ok)({ id }));
});
exports.default = router;
//# sourceMappingURL=routes.js.map