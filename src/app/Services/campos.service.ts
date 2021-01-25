import { Injectable } from '@angular/core';
import { CampoGeneral } from '../Models/campo-general';

@Injectable({
  providedIn: 'root'
})
export class CamposService {

  departamentoSeleccionado = {} as CampoGeneral;
  ciudadSeleccionada = {} as CampoGeneral;
  direccion = {} as CampoGeneral;

  constructor() {
    this.inicializarCampos()
   }

  inicializarCampos ():void {
    this.ciudadSeleccionada.habilitar = true;
    this.direccion.valor = 'Calle 45 N 34-54 APTO 304';
  }
}
