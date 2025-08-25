"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeById = exports.updateById = exports.getById = exports.list = exports.insert = exports.db = void 0;
const uuid_1 = require("uuid");
exports.db = {
    students: new Map(),
    parents: new Map(),
    teachers: new Map(),
    classes: new Map(),
    subjects: new Map(),
    enrollments: new Map(),
    grades: new Map(),
    attendance: new Map(),
    feeStructures: new Map(),
    invoices: new Map(),
    blogPosts: new Map(),
    timetable: new Map(),
    notifications: new Map(),
};
const insert = (map, data) => {
    const id = data.id ?? (0, uuid_1.v4)();
    const record = { ...data, id };
    map.set(id, record);
    return record;
};
exports.insert = insert;
const list = (map) => Array.from(map.values());
exports.list = list;
const getById = (map, id) => map.get(id);
exports.getById = getById;
const updateById = (map, id, patch) => {
    const existing = map.get(id);
    if (!existing)
        return undefined;
    const updated = { ...existing, ...patch, id };
    map.set(id, updated);
    return updated;
};
exports.updateById = updateById;
const removeById = (map, id) => map.delete(id);
exports.removeById = removeById;
//# sourceMappingURL=mockDb.js.map