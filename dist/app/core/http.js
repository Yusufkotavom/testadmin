"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.ok = void 0;
const ok = (data, message) => ({
    success: true,
    data,
    ...(message !== undefined ? { message } : {}),
});
exports.ok = ok;
class HttpError extends Error {
    constructor(status, code, message, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http.js.map