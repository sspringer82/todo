import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDialogComponent } from './description-dialog.component';

describe('DescriptionDialogComponent', () => {
  let component: DescriptionDialogComponent;
  let fixture: ComponentFixture<DescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
