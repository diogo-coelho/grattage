'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JsonWebToken {
    getToken(payload) {
        const secret = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../private/secret.key'));
        return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { iat: Math.floor(Date.now() / 1000) + 300 }), secret, { algorithm: 'RS256' });
    }
}
exports.default = JsonWebToken;
//# sourceMappingURL=JsonWebToken.js.map
//# sourceMappingURL=JsonWebToken.js.map
