import { Component, OnInit } from '@angular/core';
import { FlavorService } from '../flavor.service';
import { Flavor } from '../interfaces/Flavor';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private flavors: Flavor[];
  public savoryFlavors: Flavor[];
  public sweetFlavors: Flavor[];
  public vegetarianFlavors: Flavor[];

  constructor(private flavorService: FlavorService) {
    this.savoryFlavors = [];
    this.sweetFlavors = [];
    this.vegetarianFlavors = [];
   }

  ngOnInit() {
    this.list();
  }

  private list() {
    this.flavorService.flavorsList().subscribe(
      (flavors: Flavor[]) => {
        this.flavors = flavors;
        this.flavorList();
    } );
  }

  private flavorList() {
    this.flavors.forEach(
      (flavor: Flavor) => {
        switch (flavor.type) {
          case 'Salgada':
            this.savoryFlavors.push(flavor);
            break;
          case 'Doce':
            this.sweetFlavors.push(flavor);
            break;
          case 'Vegetariana':
            this.vegetarianFlavors.push(flavor);
            break;
          default:
            break;
        }
    });
  }
}
