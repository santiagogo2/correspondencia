import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenceRegisterComponent } from './dependence-register.component';

describe('DependenceRegisterComponent', () => {
  let component: DependenceRegisterComponent;
  let fixture: ComponentFixture<DependenceRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenceRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
