import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlendeEinzelteileAnzeigenComponent } from './fehlende-einzelteile-anzeigen.component';

describe('FehlendeEinzelteileAnzeigenComponent', () => {
  let component: FehlendeEinzelteileAnzeigenComponent;
  let fixture: ComponentFixture<FehlendeEinzelteileAnzeigenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FehlendeEinzelteileAnzeigenComponent]
    });
    fixture = TestBed.createComponent(FehlendeEinzelteileAnzeigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
