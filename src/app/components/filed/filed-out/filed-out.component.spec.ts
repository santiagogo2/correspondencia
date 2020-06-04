import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledOutComponent } from './filed-out.component';

describe('FiledOutComponent', () => {
  let component: FiledOutComponent;
  let fixture: ComponentFixture<FiledOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
