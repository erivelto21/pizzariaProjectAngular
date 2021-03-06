import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit, AfterViewChecked {
  userName: string;
  @Output() event = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewChecked() {
    if (localStorage.getItem('currentAccount') !== null) {
      this.userName = JSON.parse(localStorage.getItem('currentAccount')).systemUser.firstName;
    }

    this.cdRef.detectChanges();
  }

  logout() {
    this.authenticationService.logout();
  }

  closeSideNav() {
    this.event.emit();
  }
}
