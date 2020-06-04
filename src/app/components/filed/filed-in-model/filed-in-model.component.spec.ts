import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledInModelComponent } from './filed-in-model.component';

describe('FiledInModelComponent', () => {
  let component: FiledInModelComponent;
  let fixture: ComponentFixture<FiledInModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledInModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledInModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
