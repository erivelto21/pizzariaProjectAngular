import { CustomIngredient } from './custom-ingredient';
import { Flavor } from '../interfaces/flavor';
import { Type } from '../enums/type.enum';

export class CustomFlavor implements Flavor {

    id: number;
    name: string;
    ingredients: CustomIngredient[];
    price: number;
    image: string;
    type: Type;
    additionalsValue: number;
}
