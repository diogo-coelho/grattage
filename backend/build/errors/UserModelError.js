'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
class UserModelError extends CustomError_1.default {
    constructor(status, message) {
        super(status, message);
    }
}
exports.default = UserModelError;
//# sourceMappingURL=UserModelError.js.map
//# sourceMappingURL=UserModelError.js.map
