import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesDelServicioComponent } from './condiciones-del-servicio.component';

describe('CondicionesDelServicioComponent', () => {
  let component: CondicionesDelServicioComponent;
  let fixture: ComponentFixture<CondicionesDelServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesDelServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesDelServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
