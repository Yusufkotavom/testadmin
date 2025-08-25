export type ApiSuccess<T> = {
    success: true;
    data: T;
    message?: string;
};
export type ApiError = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};
export declare const ok: <T>(data: T, message?: string) => ApiSuccess<T>;
export declare class HttpError extends Error {
    status: number;
    code: string;
    details?: unknown;
    constructor(status: number, code: string, message: string, details?: unknown);
}
//# sourceMappingURL=http.d.ts.map