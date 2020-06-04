import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenceModelComponent } from './dependence-model.component';

describe('DependenceModelComponent', () => {
  let component: DependenceModelComponent;
  let fixture: ComponentFixture<DependenceModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenceModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
