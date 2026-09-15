export interface User {
    _id?: string;
    userName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
