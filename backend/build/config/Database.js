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
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const FormattedDate_1 = __importDefault(require("../utils/FormattedDate"));
/**
 * Classe responsável por configurar o banco de dados via Mongoose
 */
class Database {
    /**
       * @construtor Constrói a instância do banco de dados
       */
    constructor() {
        this._database = mongoose_1.default.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DATABASE}`);
    }
    get database() {
        return this._database;
    }
    /**
       * Método que conecta ao banco de dados do MongoDB
       */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this._database.then(database => {
                database.connection.on('connected', () => {
                    console.error(`[ ${FormattedDate_1.default.formattedDate} ] : Conexão estabelecida com sucesso`);
                    fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Conexão estabelecida com sucesso \r\n`);
                });
            });
            this._database.then(database => {
                database.connection.on('disconnected', () => {
                    console.error(`[ ${FormattedDate_1.default.formattedDate} ] : Conexão desconectada`);
                    fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Conexão desconectada \r\n`);
                });
            });
            this._database.then(database => {
                database.connection.on('error', () => {
                    console.error(`[ ${FormattedDate_1.default.formattedDate} ] : Erro de conexão`);
                    fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../logs/error.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Erro de conexão \r\n`);
                });
            });
        });
    }
    /**
       * Método que encerra a conexão
       */
    closeConnection() {
        process.on('SIGINT', () => {
            this._database.then(database => {
                database.connection.close(() => {
                    console.error(`[ ${FormattedDate_1.default.formattedDate} ] : Mongoose encerrado`);
                    fs_1.default.appendFileSync(path_1.default.join(__dirname, '../../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Mongoose encerrado \r\n`);
                    process.exit(0);
                });
            });
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=Database.js.map
//# sourceMappingURL=Database.js.map
