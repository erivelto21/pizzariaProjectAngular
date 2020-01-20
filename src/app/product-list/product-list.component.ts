import { Component, OnInit } from '@angular/core';
import { Flavor } from '../interfaces/Flavor';
import { FlavorService } from '../flavor.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public flavors: Flavor[];

  constructor(private saborService: FlavorService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.saborService.flavorsList().subscribe((flavors: Flavor[]) => {this.flavors = flavors; } );
  }
}
