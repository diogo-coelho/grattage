export interface Login {
    username?: string,
    email?: string, 
    password: string
}

export interface User {
    name: string,
    avatar?: string,
    username: string,
    email: string
}