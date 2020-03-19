import { Component, OnInit } from '@angular/core';
import { SystemUser } from 'src/app/interfaces/system-user';

@Component({
  selector: 'app-address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.css']
})
export class AddressDisplayComponent implements OnInit {

  user: SystemUser;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
