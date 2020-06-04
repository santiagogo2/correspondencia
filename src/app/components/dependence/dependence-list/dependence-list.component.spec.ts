import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenceListComponent } from './dependence-list.component';

describe('DependenceListComponent', () => {
  let component: DependenceListComponent;
  let fixture: ComponentFixture<DependenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
