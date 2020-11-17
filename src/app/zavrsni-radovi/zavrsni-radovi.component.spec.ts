import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZavrsniRadoviComponent } from './zavrsni-radovi.component';

describe('ZavsniRadoviComponent', () => {
  let component: ZavrsniRadoviComponent;
  let fixture: ComponentFixture<ZavrsniRadoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZavrsniRadoviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZavrsniRadoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
