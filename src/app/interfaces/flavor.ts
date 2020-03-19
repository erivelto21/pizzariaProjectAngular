import { Ingredient } from './ingredient';
import { Type } from '../enums/type.enum';

export interface Flavor {
    id: number;
    name: string;
    ingredients: Ingredient[];
    price: number;
    image: string;
    type: Type;
}
