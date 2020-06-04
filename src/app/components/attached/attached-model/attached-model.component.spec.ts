import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedModelComponent } from './attached-model.component';

describe('AttachedModelComponent', () => {
  let component: AttachedModelComponent;
  let fixture: ComponentFixture<AttachedModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
