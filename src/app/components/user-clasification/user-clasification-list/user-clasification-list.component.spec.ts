import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClasificationListComponent } from './user-clasification-list.component';

describe('UserClasificationListComponent', () => {
  let component: UserClasificationListComponent;
  let fixture: ComponentFixture<UserClasificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClasificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClasificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
