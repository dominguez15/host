import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDestinoVieajesComponent } from './form-destino-vieajes.component';

describe('FormDestinoVieajesComponent', () => {
  let component: FormDestinoVieajesComponent;
  let fixture: ComponentFixture<FormDestinoVieajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDestinoVieajesComponent]
    });
    fixture = TestBed.createComponent(FormDestinoVieajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
