import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledInComponent } from './filed-in.component';

describe('FiledInComponent', () => {
  let component: FiledInComponent;
  let fixture: ComponentFixture<FiledInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
