import { Role } from './role';
import { Address } from 'cluster';

export interface User {

    id: number;
    lastName: string;
    email: string;
    firstName: string;
    password: string;
    role: Role;
    token: string;
    address?: Address;
}
