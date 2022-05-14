export interface PayloadUserToken {
    name: string,
    username: string,
    email: string,
}

export interface IUserDAO extends Document {
    _id?: string,
    _name: string;
    _avatar?: string;
    _username: string;
    _email: string;
    _password: string;
    created_at?: Date,
    updated_at?: Date
}
