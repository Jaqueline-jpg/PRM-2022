export interface ICredential {
    email: string;
    password: string;
}

//? não é opcional
export interface IUser {
    uid?: string;
    name: string;
    email: string;
    password?: string;
}