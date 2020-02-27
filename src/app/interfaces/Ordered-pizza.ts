import { CustomFlavor } from '../classes/custom-flavor';

export interface OrderedPizza {

    id: number;
    customFlavor: CustomFlavor;
    amount: number;
}
