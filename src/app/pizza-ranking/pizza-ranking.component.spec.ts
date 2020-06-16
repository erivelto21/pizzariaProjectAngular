import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaRankingComponent } from './pizza-ranking.component';

describe('PizzaRankingComponent', () => {
  let component: PizzaRankingComponent;
  let fixture: ComponentFixture<PizzaRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
