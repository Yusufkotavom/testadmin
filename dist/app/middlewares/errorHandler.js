"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_1 = require("../core/http");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof http_1.HttpError) {
        const payload = {
            success: false,
            error: { code: err.code, message: err.message, details: err.details },
        };
        return res.status(err.status).json(payload);
    }
    const payload = {
        success: false,
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unexpected error occurred' },
    };
    return res.status(500).json(payload);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map