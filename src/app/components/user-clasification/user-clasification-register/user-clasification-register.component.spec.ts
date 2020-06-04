import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClasificationRegisterComponent } from './user-clasification-register.component';

describe('UserClasificationRegisterComponent', () => {
  let component: UserClasificationRegisterComponent;
  let fixture: ComponentFixture<UserClasificationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClasificationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClasificationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
