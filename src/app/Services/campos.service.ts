import { Injectable } from '@angular/core';
import { CampoGeneral } from '../Models/campo-general';
import { Cities } from '../Models/cities';
import { Departments } from '../Models/departments';

@Injectable({
  providedIn: 'root'
})
export class CamposService {


  formDatosIdentificacion = {
    nombres: { valor: '', inhabilitar: true } as CampoGeneral,
    tipoDocumentoSeleccionado: { valor: '', inhabilitar: true } as CampoGeneral,
    noDocumento: { valor: '', inhabilitar: true } as CampoGeneral,
    telefono: { valor: '', inhabilitar: true } as CampoGeneral,
    email: { valor: '', inhabilitar: false } as CampoGeneral,
    departamentoSeleccionado: { valor: '', inhabilitar: false } as CampoGeneral,
    ciudadSeleccionada: { valor: '', inhabilitar: true } as CampoGeneral,
    direccion: { valor: '', inhabilitar: true, estado: false } as CampoGeneral,
    botonValidarDireccion: { inhabilitar: true, valor: 'Validar' } as CampoGeneral,
    objetoDepartamento: {} as Departments,
    objetoCiudad: {} as Cities,
  }

  formInformacionEquipo = {

  }

  paramTiposDocumentos: any

  constructor() {

  }

}
