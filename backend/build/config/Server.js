'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const Application_1 = __importDefault(require("./Application"));
const Database_1 = __importDefault(require("./Database"));
/**
 * Classe que configura o servidor da Aplica????o
 */
class Server {
    /**
       * @construtor Constr??i a inst??ncia do servidor
       */
    constructor() {
        this._port = this.normalizePort(process.env.PORT || 80);
        this._server = this.configureApplication();
    }
    configureApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Database_1.default.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                    Application_1.default.set('port', this._port);
                    Application_1.default.set('database', yield Database_1.default.database);
                    resolve(http.createServer(Application_1.default));
                })).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    normalizePort(val) {
        const port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    }
    get port() {
        return this._port;
    }
    get server() {
        return this._server;
    }
    closeDatabase() {
        Application_1.default.get('database').closeConnection();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map
//# sourceMappingURL=Server.js.map
