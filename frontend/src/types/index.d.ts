export type Login = {
    username?: string,
    email?: string, 
    password?: string
}

export type InputError = {
    inputType?: string[],
    messageError?: string
}

export type User = {
    name: string,
    avatar?: string,
    username: string,
    email: string
}

export type InputType = 
| 'text'
| 'email'
| 'password'
| 'number'
| 'date';

export type HttpResponseError = {
    statusCode: number,
    stack: string,
    message: string
}

export type ElementStylePosition = {
    right?: number,
    left?: number,
    top?: number,
    bottom?: number
}

export interface DropDownItem {
    label: string,
    icon?: string,
    callbackFunction: (payload: T) => T
}