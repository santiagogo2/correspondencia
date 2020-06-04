import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledOutModelComponent } from './filed-out-model.component';

describe('FiledOutModelComponent', () => {
  let component: FiledOutModelComponent;
  let fixture: ComponentFixture<FiledOutModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledOutModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledOutModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
