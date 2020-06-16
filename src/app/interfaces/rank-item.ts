import { Type } from '../enums/type.enum';

export interface RankItem {

    name: string;
    price: number;
    type: Type;
    amount: number;
    image: string;
    description: string;
}
