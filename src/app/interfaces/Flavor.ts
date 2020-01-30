import { Ingredient } from './ingredient';
import { Role } from './role';

export interface Flavor {
    id: number;
    name: string;
    ingredients: Ingredient[];
    role: Role;
    price: number;
    image: string;
    type: string;
}
