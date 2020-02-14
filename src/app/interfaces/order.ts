import { User } from './user';
import { OrderedPizza } from './ordered-pizza';

export interface Order {
    id: number;
    transactionId: string;
    transactionStatus: string;
    total: number;
    date: string;
    paymentWay: string;
    user: User;
    pizzas: OrderedPizza[];
}
