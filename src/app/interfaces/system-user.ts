import { Role } from './role';
import { Address } from './address';

export interface SystemUser {
    id: number;
    lastName: string;
    email: string;
    firstName: string;
    password: string;
    role: Role;
    token: string;
    refreshToken: string;
    address?: Address;
    phone?: string;
}
