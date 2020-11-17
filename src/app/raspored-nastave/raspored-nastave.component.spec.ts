import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedNastaveComponent } from './raspored-nastave.component';

describe('RasporedNastaveComponent', () => {
  let component: RasporedNastaveComponent;
  let fixture: ComponentFixture<RasporedNastaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedNastaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasporedNastaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
