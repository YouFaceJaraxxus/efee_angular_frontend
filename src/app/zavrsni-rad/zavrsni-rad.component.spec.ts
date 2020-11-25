import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZavrsniRadComponent } from './zavrsni-rad.component';

describe('ZavrsniRadComponent', () => {
  let component: ZavrsniRadComponent;
  let fixture: ComponentFixture<ZavrsniRadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZavrsniRadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZavrsniRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
