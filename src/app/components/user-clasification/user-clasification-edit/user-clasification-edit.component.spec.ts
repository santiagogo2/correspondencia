import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClasificationEditComponent } from './user-clasification-edit.component';

describe('UserClasificationEditComponent', () => {
  let component: UserClasificationEditComponent;
  let fixture: ComponentFixture<UserClasificationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClasificationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClasificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
