import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sideNavBarIsClose = true;

  constructor() { }

  change() {
    this.sideNavBarIsClose = !this.sideNavBarIsClose;
  }
}
