'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const AuthenticationRouter_1 = __importDefault(require("../router/AuthenticationRouter"));
const CustomError_1 = __importDefault(require("../errors/CustomError"));
/**
 * Classe responsável por instanciar a aplicação do Express
 */
class Application {
    /**
     * @construtor Constrói a instância da classe inicializando o Express
     */
    constructor() {
        this._express = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    /**
     * @returns a instãncia da aplicação do Express
     */
    get express() {
        return this._express;
    }
    /**
     * Aplica as middlewares do pacote body-parser
     */
    middleware() {
        this._express.use(body_parser_1.default.json());
        this._express.use(body_parser_1.default.urlencoded({ extended: false }));
        this._express.use((0, cors_1.default)());
    }
    /**
     * Configura as rotas da aplicação
     */
    routes() {
        const router = express_1.default.Router();
        this._express.use('/api/v1/', router);
        this._express.use('/api/v1/authentication', AuthenticationRouter_1.default);
        this._express.use('*', () => { throw new CustomError_1.default(404, 'Endpoint não encontrado'); });
    }
}
exports.default = new Application().express;
//# sourceMappingURL=Application.js.map
//# sourceMappingURL=Application.js.map
