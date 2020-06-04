import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumModelComponent } from './memorandum-model.component';

describe('MemorandumModelComponent', () => {
  let component: MemorandumModelComponent;
  let fixture: ComponentFixture<MemorandumModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorandumModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorandumModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
