import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenceEditComponent } from './dependence-edit.component';

describe('DependenceEditComponent', () => {
  let component: DependenceEditComponent;
  let fixture: ComponentFixture<DependenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
