import { logging } from 'protractor';
import { User } from './user';
import { OrderedPizza } from './ordered-pizza';

export interface Order {
    id: number;
    transactionId: string;
    transactionStatus: string;
    total: number;
    paymentWay: string;
    user: User;
    pizzas: OrderedPizza[];
}
