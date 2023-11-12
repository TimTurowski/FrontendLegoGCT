import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinzelteileAnzeigenComponent } from './einzelteile-anzeigen.component';

describe('EinzelteileAnzeigenComponent', () => {
  let component: EinzelteileAnzeigenComponent;
  let fixture: ComponentFixture<EinzelteileAnzeigenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EinzelteileAnzeigenComponent]
    });
    fixture = TestBed.createComponent(EinzelteileAnzeigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
