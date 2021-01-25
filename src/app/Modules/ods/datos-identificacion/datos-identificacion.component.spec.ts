import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosIdentificacionComponent } from './datos-identificacion.component';

describe('DatosIdentificacionComponent', () => {
  let component: DatosIdentificacionComponent;
  let fixture: ComponentFixture<DatosIdentificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosIdentificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosIdentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
