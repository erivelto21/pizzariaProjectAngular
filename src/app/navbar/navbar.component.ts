import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() event = new EventEmitter();
  navSideIsHidden = true;
  navIsMoved = false;

  constructor() { }

  ngOnInit() {
  }

  sideNav() {
    this.navSideIsHidden = !this.navSideIsHidden;
    this.navIsMoved = !this.navIsMoved;
    this.event.emit();
  }
}
