import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsichtComponent } from './ansicht.component';

describe('AnsichtComponent', () => {
  let component: AnsichtComponent;
  let fixture: ComponentFixture<AnsichtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnsichtComponent]
    });
    fixture = TestBed.createComponent(AnsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
