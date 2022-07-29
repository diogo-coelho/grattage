'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
class AuthenticationControllerError extends CustomError_1.default {
    constructor(status, message) {
        super(status, message);
    }
}
exports.default = AuthenticationControllerError;
//# sourceMappingURL=AuthenticationControllerError.js.map
//# sourceMappingURL=AuthenticationControllerError.js.map
