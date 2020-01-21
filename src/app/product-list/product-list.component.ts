import { Component, OnInit, Input } from '@angular/core';
import { Flavor } from '../interfaces/Flavor';

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
}
