import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedEditComponent } from './attached-edit.component';

describe('AttachedEditComponent', () => {
  let component: AttachedEditComponent;
  let fixture: ComponentFixture<AttachedEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
