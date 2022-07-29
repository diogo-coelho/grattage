'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
class RouterError extends CustomError_1.default {
    constructor(status, message) {
        super(status, message);
    }
}
exports.default = RouterError;
//# sourceMappingURL=RouterError.js.map
//# sourceMappingURL=RouterError.js.map
