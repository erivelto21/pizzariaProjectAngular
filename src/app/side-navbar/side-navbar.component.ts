import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit, AfterViewChecked {
  userName: string;

  constructor(private authenticationService: AuthenticationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewChecked() {
    if (localStorage.getItem('currentUser') !== null) {
      this.userName = JSON.parse(localStorage.getItem('currentUser')).username;
    }

    this.cdRef.detectChanges();
  }

  logout() {
    this.authenticationService.logout();
  }
}
