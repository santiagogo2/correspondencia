import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClasificationModelComponent } from './user-clasification-model.component';

describe('UserClasificationModelComponent', () => {
  let component: UserClasificationModelComponent;
  let fixture: ComponentFixture<UserClasificationModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClasificationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClasificationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
