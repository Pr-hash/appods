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
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { DiagnosticoPreparacionComponent } from './diagnostico-preparacion/diagnostico-preparacion.component';

@NgModule({
  declarations: [
    AceptacionDeCondicionesComponent,
    CondicionesDelServicioComponent,
    DatosDelEquipoComponent,
    DatosIdentificacionComponent,
    EstadoInspeccionFisicaComponent,
    FormularioComponent,
    IngresoComponent,
    DiagnosticoPreparacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ], exports: [
    FormularioComponent
  ]
})
export class OdsModule { }
