'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRouter = void 0;
const express_1 = require("express");
const AuthenticationController_1 = __importDefault(require("../app/controllers/AuthenticationController"));
class AuthenticationRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this.init();
    }
    get router() {
        return this._router;
    }
    init() {
        const authenticationController = new AuthenticationController_1.default();
        this._router.post('/create', authenticationController.create);
        this._router.post('/login', authenticationController.login);
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
const authenticationRouter = new AuthenticationRouter();
exports.default = authenticationRouter.router;
//# sourceMappingURL=AuthenticationRouter.js.map
//# sourceMappingURL=AuthenticationRouter.js.map
