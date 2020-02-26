import { Ingredient } from './ingredient';

export interface Flavor {
    id: number;
    name: string;
    ingredients: Ingredient[];
    price: number;
    image: string;
    type: string;
}
