'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Server_1 = __importDefault(require("./config/Server"));
const FormattedDate_1 = __importDefault(require("./utils/FormattedDate"));
const httpServer = new Server_1.default();
httpServer.server.then((server) => {
    server.listen(httpServer.port);
    server.on('error', onError);
    server.on('listening', onListening);
    server.setTimeout(0);
    function onError(error) {
        if (error.syscall !== 'listen')
            throw error;
        const bind = (typeof httpServer.port === 'string') ? 'Pipe ' + httpServer.port : 'Porta ' + httpServer.port;
        switch (error.code) {
            case 'EACCES':
                httpServer.closeDatabase();
                console.error(`[ ${FormattedDate_1.default.formattedDate} ] : ${bind} requer privilégios elevados de acesso`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : ${bind} requer privilégios elevados de acesso \r\n`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                httpServer.closeDatabase();
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : ${bind} já está em uso`);
                fs_1.default.appendFileSync(path_1.default.join(__dirname, '../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : ${bind} já está em uso \r\n`);
                process.exit(1);
                break;
            default:
                httpServer.closeDatabase();
                throw error;
        }
    }
    function onListening() {
        const addr = server.address();
        if (addr) {
            const bind = (typeof addr === 'string') ? `pipe ${addr}` : `porta ${addr.port}`;
            console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Servidor rodando na ${bind}`);
            fs_1.default.appendFileSync(path_1.default.join(__dirname, '../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Servidor rodando na ${bind} \r\n`);
        }
    }
})
    .catch((err) => {
    console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Não foi possível inicializar o servidor ${err.stack}`);
    fs_1.default.appendFileSync(path_1.default.join(__dirname, '../logs/server.log'), `[ ${FormattedDate_1.default.formattedDate} ] : Não foi possível inicializar o servidor ${err.stack} \r\n`);
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
