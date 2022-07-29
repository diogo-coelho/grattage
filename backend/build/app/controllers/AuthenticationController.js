'use strict';
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FormattedDate_1 = __importDefault(require("../../utils/FormattedDate"));
const UserDAO_1 = __importDefault(require("../models/UserDAO"));
const User_1 = __importDefault(require("../models/User"));
const AuthenticationControllerError_1 = __importDefault(require("../../errors/AuthenticationControllerError"));
const JsonWebToken_1 = __importDefault(require("../middleware/JsonWebToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthenticationController {
    /**
     * Método que cria um usuário no banco de dados
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Nova requisição de criação de usuário`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../../logs/authentication.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Nova requisição de criação de usuário \r\n`);
                const user = new User_1.default();
                user.setName(req.body.name);
                user.setUserName(req.body.username);
                user.setEmail(req.body.email);
                yield user.setPassword(req.body.password);
                const userHasAlreadyBeenCreated = yield AuthenticationController._userDAO.model.find({
                    $or: [
                        { _username: user.userName },
                        { _email: user.email }
                    ]
                });
                if (userHasAlreadyBeenCreated.length > 0) {
                    throw new AuthenticationControllerError_1.default(409, 'Usuário existente');
                }
                const record = yield AuthenticationController._userDAO.model.create(Object.assign(Object.assign({}, user), { created_at: new Date(), updated_at: new Date() }));
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Fim da requisição de criação de usuário`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../../logs/authentication.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Fim da requisição de criação de usuário \r\n`);
                res.status(201).json({ _id: record._id });
            }
            catch (err) {
                console.log(err);
                res.status(err.status).json({ statusCode: err._status, message: err._message, stack: err._stack });
            }
        });
    }
    /**
     * Método que autentica um usuário no sistema e retorna um token de acesso
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Nova requisição de login`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../../logs/authentication.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Nova requisição de login \r\n`);
                if (!req.body.password || (!req.body.username && !req.body.email))
                    throw new AuthenticationControllerError_1.default(400, 'Parâmetros incorretos');
                const user = new User_1.default();
                if (req.body.username)
                    user.setUserName(req.body.username);
                if (req.body.email)
                    user.setEmail(req.body.email);
                const userFound = yield AuthenticationController._userDAO.model.findOne({
                    $or: [
                        { _username: user.userName },
                        { _email: user.email }
                    ]
                });
                if (!userFound)
                    throw new AuthenticationControllerError_1.default(401, 'Credenciais inválidas');
                const isValidPassword = yield bcrypt_1.default.compare(req.body.password, userFound._password);
                if (!isValidPassword)
                    throw new AuthenticationControllerError_1.default(401, 'Credenciais inválidas');
                const token = new JsonWebToken_1.default().getToken({ name: userFound._name, username: userFound._username, email: userFound._email });
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Fim da requisição de login`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../../logs/authentication.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Fim da requisição de login \r\n`);
                res.status(200).json({ token });
            }
            catch (err) {
                console.log(err);
                res.status(err.status).json({ statusCode: err._status, message: err._message, stack: err._stack });
            }
        });
    }
}
AuthenticationController._userDAO = new UserDAO_1.default();
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map
//# sourceMappingURL=AuthenticationController.js.map
