import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() event = new EventEmitter();
  class = '';
  style = '-30%';

  constructor() { }

  ngOnInit() {
  }

  moveClass() {
    this.class = this.class === '' ? '30%' : '';
    this.style = this.style === '-30%' ? '' : '-30%';
    this.event.emit();
  }
}
