import { Component, OnInit, Input } from '@angular/core';
import { Flavor } from '../interfaces/Flavor';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() flavor: Flavor;

  constructor() { }

  ngOnInit() {
  }
}
