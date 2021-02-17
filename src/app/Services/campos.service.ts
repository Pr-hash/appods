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
    direccion: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    botonValidarDireccion: { inhabilitar: true, valor: 'Validar' } as CampoGeneral,
    objetoDepartamento: {} as Departments,
    objetoCiudad: {} as Cities,
  }

  formInformacionEquipo = {
    marca: { valor: '', inhabilitar: true } as CampoGeneral,
    modelo: { valor: '', inhabilitar: true } as CampoGeneral,
    min: { valor: '', inhabilitar: true } as CampoGeneral,
    imei: { valor: '', inhabilitar: true } as CampoGeneral,
    color: { valor: '', inhabilitar: false } as CampoGeneral,
    sn: { valor: '', inhabilitar: true } as CampoGeneral,
    periododegarantia: { valor: '', inhabilitar: true } as CampoGeneral,
    servicio: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    doa: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    tipodeprestamo: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    fechadeingreso: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    horadeingreso: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    fechadecompra: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    centrodeatencion: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
    distribudorcentroingreso: { valor: '', inhabilitar: false, estado: true} as CampoGeneral,
  }

  paramTiposDocumentos: any
  paramWsRest: any

  constructor() {

  }

}
