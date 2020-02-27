import { Ingredient } from '../interfaces/ingredient';

export class CustomIngredient implements Ingredient {

    id: number;
    name: string;
    amount: number;
}
