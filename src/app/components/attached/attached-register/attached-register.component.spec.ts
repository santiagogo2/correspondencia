import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedRegisterComponent } from './attached-register.component';

describe('AttachedRegisterComponent', () => {
  let component: AttachedRegisterComponent;
  let fixture: ComponentFixture<AttachedRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
