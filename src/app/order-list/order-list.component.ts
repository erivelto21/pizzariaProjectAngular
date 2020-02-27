import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order';
import { OrderedPizza } from '../interfaces/ordered-pizza';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  pizzas: string;


  constructor(private orderService: OrderService, private alertService: AlertService) { }

  ngOnInit() {
    this.orderService.getByUser().subscribe(
      (data: Order[]) => {
        this.orders = data.slice(0).reverse();
      },
      error => {
        this.alertService.error(error.error.message, false);
      }
    );
  }

  public getAmount(pizzas: OrderedPizza[]): number {
    let amount = 0;

    pizzas.forEach( (pizza: OrderedPizza) => amount += pizza.amount);

    return amount;
  }

  public getPizzas(pizzas: OrderedPizza[]): string {
    let line = '';
    const aux: OrderedPizza[] = JSON.parse(JSON.stringify(pizzas));

    this.putCommaAndDot(aux);

    aux.forEach( (pizza: OrderedPizza) => line += pizza.customFlavor.name);

    return line;
  }

  private putCommaAndDot(pizzas: OrderedPizza[]) {
    const pointIndex = pizzas.length - 1;

    for (let i = 0; i < pizzas.length; i++) {
      if (i === pointIndex) {
        pizzas[i].customFlavor.name += '.';
      } else {
        pizzas[i].customFlavor.name += ', ';
      }
    }
  }
}
