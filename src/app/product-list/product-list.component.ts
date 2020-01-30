import { Component, OnInit, Input } from '@angular/core';
import { Flavor } from '../interfaces/flavor';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() flavors: Flavor[];
  @Input() type: string;

  constructor() {}

  ngOnInit() {
  }

  h3TypeColor(): string {
    switch (this.type) {
      case 'Pizzas Salgadas':
        return 'savory-type';
        break;
      case 'Pizzas Doces':
        return 'sweet-type';
        break;
      case 'Pizzas Vegetarianas':
        return 'vegetarian-type';
        break;
      default:
        break;
    }
  }
}
