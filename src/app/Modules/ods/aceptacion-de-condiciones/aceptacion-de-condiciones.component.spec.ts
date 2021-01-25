import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptacionDeCondicionesComponent } from './aceptacion-de-condiciones.component';

describe('AceptacionDeCondicionesComponent', () => {
  let component: AceptacionDeCondicionesComponent;
  let fixture: ComponentFixture<AceptacionDeCondicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptacionDeCondicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptacionDeCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
