import { CustomIngredient } from './custom-ingredient';
import { Flavor } from '../interfaces/flavor';

export class CustomFlavor implements Flavor {

    id: number;
    name: string;
    ingredients: CustomIngredient[];
    price: number;
    image: string;
    type: string;
    additionalsValue: number;
}
