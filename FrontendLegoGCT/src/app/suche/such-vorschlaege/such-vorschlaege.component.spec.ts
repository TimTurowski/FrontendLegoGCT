import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuchVorschlaegeComponent } from './such-vorschlaege.component';

describe('SuchVorschlaegeComponent', () => {
  let component: SuchVorschlaegeComponent;
  let fixture: ComponentFixture<SuchVorschlaegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuchVorschlaegeComponent]
    });
    fixture = TestBed.createComponent(SuchVorschlaegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
