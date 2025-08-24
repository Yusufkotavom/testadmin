"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRoles = exports.mockAuth = void 0;
const http_1 = require("../core/http");
// Mock auth: read x-user-id and x-user-role headers
const mockAuth = (req, _res, next) => {
    const userId = req.header('x-user-id') || 'mock-user';
    const role = req.header('x-user-role') || 'admin';
    req.user = { id: userId, role };
    next();
};
exports.mockAuth = mockAuth;
const requireRoles = (...roles) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
        return next(new http_1.HttpError(401, 'UNAUTHORIZED', 'Authentication required'));
    }
    if (!roles.includes(user.role)) {
        return next(new http_1.HttpError(403, 'FORBIDDEN', 'Insufficient permissions'));
    }
    next();
};
exports.requireRoles = requireRoles;
//# sourceMappingURL=auth.js.map