import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUsersRegisterComponent } from './app-users-register.component';

describe('AppUsersRegisterComponent', () => {
  let component: AppUsersRegisterComponent;
  let fixture: ComponentFixture<AppUsersRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUsersRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUsersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
