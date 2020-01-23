import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHomePageComponent } from './carousel-home-page.component';

describe('CarouselHomePageComponent', () => {
  let component: CarouselHomePageComponent;
  let fixture: ComponentFixture<CarouselHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
