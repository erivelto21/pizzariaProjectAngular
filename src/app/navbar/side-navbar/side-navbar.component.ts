import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  @Input() navSideIsHidden;
  @Output() event = new EventEmitter();

  constructor() { }
  route: ActivatedRoute;
  fragment: string;

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewChecked(): void {
    try {
        if (this.fragment) {
            document.querySelector('#' + this.fragment).scrollIntoView();
        }
    } catch (e) { }
  }

  sideNav() {
    this.event.emit();
  }
}
