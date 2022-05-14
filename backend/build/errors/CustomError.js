'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(status, message) {
        var _a;
        super(message);
        this._status = status;
        this._stack = (_a = new Error()) === null || _a === void 0 ? void 0 : _a.stack;
        this.init();
    }
    init() {
        switch (this._status) {
            case 400: {
                this._message = 'ERR_BAD_REQUEST';
                break;
            }
            case 401: {
                this._message = 'ERR_UNAUTHORIZED';
                break;
            }
            case 404: {
                this._message = 'ERR_NOT_FOUND';
                break;
            }
            case 409: {
                this._message = 'ERR_CONFLICT';
                break;
            }
            case 500: {
                this._message = 'ERR_INTERNAL_SERVER';
                break;
            }
            case 503: {
                this._message = 'ERR_SERVICE_UNAVAILABLE';
                break;
            }
        }
    }
    get status() {
        return this._status;
    }
    get message() {
        return this._message;
    }
    get stack() {
        return this._stack;
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map
//# sourceMappingURL=CustomError.js.map
