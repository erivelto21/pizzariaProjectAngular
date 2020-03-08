import { CustomFlavor } from '../classes/custom-flavor';
import { Size } from '../enums/size.enum';
import { Dough } from '../enums/dough.enum';
import { PizzaEdge } from '../enums/pizza-edge.enum';

export interface Pizza {

    id: number;
    customFlavor: CustomFlavor;
    size: Size;
    dough: Dough;
    pizzaEdge: PizzaEdge;
    amount: number;
}
