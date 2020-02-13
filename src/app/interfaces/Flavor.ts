import { Ingredient } from './ingredient';
import { Role } from './role';

export interface Flavor {
    id: number;
    name: string;
    ingredients: Ingredient[];
    price: number;
    image: string;
    type: string;
}
