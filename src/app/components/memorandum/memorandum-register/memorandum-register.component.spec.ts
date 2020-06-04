import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumRegisterComponent } from './memorandum-register.component';

describe('MemorandumRegisterComponent', () => {
  let component: MemorandumRegisterComponent;
  let fixture: ComponentFixture<MemorandumRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorandumRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorandumRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
