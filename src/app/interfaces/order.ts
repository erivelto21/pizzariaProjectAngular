import { SystemUser } from './system-user';
import { Pizza } from './pizza';

export interface Order {
    id: number;
    transactionId: string;
    transactionStatus: string;
    total: number;
    date: string;
    paymentWay: string;
    user: SystemUser;
    deliveryFee: number;
    pizzas: Pizza[];
}
