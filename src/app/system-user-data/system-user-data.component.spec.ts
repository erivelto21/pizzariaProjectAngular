import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserDataComponent } from './system-user-data.component';

describe('SystemUserDataComponent', () => {
  let component: SystemUserDataComponent;
  let fixture: ComponentFixture<SystemUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
