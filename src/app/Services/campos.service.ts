import { Injectable } from '@angular/core';
import { CampoGeneral } from '../Models/campo-general';

@Injectable({
  providedIn: 'root'
})
export class CamposService {


  formDatosIdentificacion = {
    nombres: { valor: '', habilitar: true } as CampoGeneral,
    tipoDocumentoSeleccionado: { valor: '', habilitar: true } as CampoGeneral,
    noDocumento: { valor: '', habilitar: true } as CampoGeneral,
    telefono: { valor: '', habilitar: true } as CampoGeneral,
    email: { valor: '' } as CampoGeneral,
    departamentoSeleccionado: { valor: '' } as CampoGeneral,
    ciudadSeleccionada: { valor: '', habilitar: true } as CampoGeneral,
    direccion: { valor: '', habilitar: true, estado: false } as CampoGeneral,
    botonValidarDireccion: { habilitar: true } as CampoGeneral,
  }

  formInformacionEquipo = {

  }



  constructor() {

  }

}
