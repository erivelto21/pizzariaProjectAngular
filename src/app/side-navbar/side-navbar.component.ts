import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Input() navSideIsHidden;
  @Output() event = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  em() {
    this.event.emit();
  }
}
