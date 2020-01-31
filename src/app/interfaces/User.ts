import { Role } from './role';

export interface User {

    id: number;
    lastName: string;
    email: string;
    firstName: string;
    password: string;
    role: Role;
    token: string;
}
