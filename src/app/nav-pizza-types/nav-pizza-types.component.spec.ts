import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPizzaTypesComponent } from './nav-pizza-types.component';

describe('NavPizzaTypesComponent', () => {
  let component: NavPizzaTypesComponent;
  let fixture: ComponentFixture<NavPizzaTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPizzaTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPizzaTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
