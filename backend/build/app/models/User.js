"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModelError_1 = __importDefault(require("../../errors/UserModelError"));
class User {
    setName(name) {
        if (name.trim() === '') {
            throw new UserModelError_1.default(400, 'O nome não pode estar vazio');
        }
        if (name.length > 5 && name.length < 50) {
            this._name = name;
        }
        else {
            throw new UserModelError_1.default(400, 'O nome de usuário deve ter entre 5 e 50 caracteres');
        }
    }
    setAvatar(avatar) {
        this._avatar = avatar;
    }
    setUserName(username) {
        // eslint-disable-next-line
        const re = /^(?=.*[a-z])([a-z]{3,10})+([.\-_]{0,1})+([a-z0-9]{3,20})$/;
        if (username.length < 3 || username.length > 50) {
            throw new UserModelError_1.default(400, 'O username deve ter entre 3 e 50 caracteres');
        }
        if (re.test(username)) {
            this._username = username;
        }
        else {
            throw new UserModelError_1.default(400, 'O username deve ter apenas letras minúsculas, números, ponto, hífen ou underline');
        }
    }
    setEmail(email) {
        // eslint-disable-next-line
        const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (re.test(email)) {
            this._email = email;
        }
        else {
            throw new UserModelError_1.default(400, 'E-mail inválido');
        }
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line
            const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\)\({}#%])[A-Za-z\d@$!%*?&\)\({}#%]{8,10}/;
            if (re.test(password)) {
                const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
                const passwordHashed = yield bcrypt_1.default.hash(password, saltRounds);
                this._password = passwordHashed;
            }
            else {
                throw new UserModelError_1.default(400, 'Senha inválida. A senha precisa ter entre 8 e 10 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial');
            }
        });
    }
    get name() {
        return this._name;
    }
    get avatar() {
        return this._avatar;
    }
    get userName() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map
//# sourceMappingURL=User.js.map
