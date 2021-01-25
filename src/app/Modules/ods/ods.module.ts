import { IngresoComponent } from './ingreso/ingreso.component';
import { FormularioComponent } from './formulario/formulario.component';
import { EstadoInspeccionFisicaComponent } from './estado-inspeccion-fisica/estado-inspeccion-fisica.component';
import { DatosIdentificacionComponent } from './datos-identificacion/datos-identificacion.component';
import { DatosDelEquipoComponent } from './datos-del-equipo/datos-del-equipo.component';
import { CondicionesDelServicioComponent } from './condiciones-del-servicio/condiciones-del-servicio.component';
import { AceptacionDeCondicionesComponent } from './aceptacion-de-condiciones/aceptacion-de-condiciones.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AceptacionDeCondicionesComponent,
    CondicionesDelServicioComponent,
    DatosDelEquipoComponent,
    DatosIdentificacionComponent,
    EstadoInspeccionFisicaComponent,
    FormularioComponent,
    IngresoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], exports:[
    FormularioComponent
  ]
})
export class OdsModule { }
