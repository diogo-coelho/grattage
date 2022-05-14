'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class UserDAO {
    constructor() {
        this.initSchema();
        this._model = (0, mongoose_1.model)('User', this._schema);
    }
    initSchema() {
        this._schema = new mongoose_1.Schema({
            _name: {
                type: String
            },
            _avatar: {
                type: String
            },
            _username: {
                type: String
            },
            _email: {
                type: String
            },
            _password: {
                type: String,
                required: true
            },
            created_at: {
                type: Date
            },
            updated_at: {
                type: Date
            }
        });
    }
    get model() {
        return this._model;
    }
}
exports.default = UserDAO;
//# sourceMappingURL=UserDAO.js.map
//# sourceMappingURL=UserDAO.js.map
