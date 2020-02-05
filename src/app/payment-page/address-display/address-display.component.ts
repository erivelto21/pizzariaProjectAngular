import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.css']
})
export class AddressDisplayComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
