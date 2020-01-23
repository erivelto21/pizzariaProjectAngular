import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-home-page',
  templateUrl: './carousel-home-page.component.html',
  styleUrls: ['./carousel-home-page.component.css']
})
export class CarouselHomePageComponent implements OnInit {
  carouselIsMoved = false;

  ngOnInit() {

  }

  moveClass() {
    this.carouselIsMoved = !this.carouselIsMoved;
  }
}
