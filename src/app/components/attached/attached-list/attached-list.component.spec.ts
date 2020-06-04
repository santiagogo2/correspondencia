import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedListComponent } from './attached-list.component';

describe('AttachedListComponent', () => {
  let component: AttachedListComponent;
  let fixture: ComponentFixture<AttachedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
