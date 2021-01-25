import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoInspeccionFisicaComponent } from './estado-inspeccion-fisica.component';

describe('EstadoInspeccionFisicaComponent', () => {
  let component: EstadoInspeccionFisicaComponent;
  let fixture: ComponentFixture<EstadoInspeccionFisicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoInspeccionFisicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoInspeccionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
