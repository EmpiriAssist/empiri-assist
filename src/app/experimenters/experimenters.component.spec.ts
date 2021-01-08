import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentersComponent } from './experimenters.component';

describe('ExperimentersComponent', () => {
  let component: ExperimentersComponent;
  let fixture: ComponentFixture<ExperimentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
