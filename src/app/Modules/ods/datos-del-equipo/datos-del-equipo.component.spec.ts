import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDelEquipoComponent } from './datos-del-equipo.component';

describe('DatosDelEquipoComponent', () => {
  let component: DatosDelEquipoComponent;
  let fixture: ComponentFixture<DatosDelEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDelEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
