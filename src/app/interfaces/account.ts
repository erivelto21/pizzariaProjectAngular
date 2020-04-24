import { SystemUser } from './system-user';
import { Flavor } from './flavor';

export interface Account {
    id: number;
    systemUser: SystemUser;
    favorites: Flavor[];
}
