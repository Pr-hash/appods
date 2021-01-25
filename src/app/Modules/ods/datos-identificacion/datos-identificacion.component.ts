import { Generalresp } from './../../../Models/generalresp';
import { Documentos } from 'src/app/Models/documentos';
import { Component, OnInit } from '@angular/core';
import { Cities } from 'src/app/Models/cities';
import { Departments } from 'src/app/Models/departments';
import { RespGeneral } from 'src/app/Models/resp-general';
import { CamposService } from 'src/app/Services/campos.service';
import { ServiciosJavaService } from 'src/app/Services/servicios-java.service';

@Component({
  selector: 'app-datos-identificacion',
  templateUrl: './datos-identificacion.component.html',
  styleUrls: ['./datos-identificacion.component.css']
})
export class DatosIdentificacionComponent implements OnInit {
  private respGeneralDepar: RespGeneral;
  private respGeneralDocu: Generalresp[];
  public listadoDepartamentos: Departments[];
  public listadoDeCiudades: Cities[];
  public listadoDeDocumentos: Documentos[];

  constructor(
    private servicios: ServiciosJavaService,
    public campos: CamposService,
  ) { }

  ngOnInit(): void {
    this.getDeparatamentosandcites();
    this.postDocumentos();
  }

  getDeparatamentosandcites() {
    this.servicios.getCitiesDepartaments().subscribe(
      data => {
        console.log('Ciudades y departamentos: ', data);
        this.respGeneralDepar = data as RespGeneral;
        console.log('Datos: ', this.respGeneralDepar);
        if (this.respGeneralDepar.isValid) {
          this.listadoDepartamentos = JSON.parse(this.respGeneralDepar.message);
          console.log('Departamentos: ', this.listadoDepartamentos);
        } else {
          console.log('Error: ', this.respGeneralDepar.message); // DESPUES
        }
      }, error => {
        console.log('Error de ciudades y departamentos:', error); // DESPUES
      }
    )
  }

  postDocumentos() {
    this.servicios.postDocumentos().subscribe(
      data => {
        console.log('Resp parámetros: ', data);
        this.respGeneralDocu = data as Generalresp[];
        // console.log('Datos tipos de documento: ', this.respGeneralDocu);
        const tiposDocumento = this.respGeneralDocu.find(p => p.NAME_PARAMETER.indexOf('DOCUMENT_TYPES') != -1)
        // console.log('Los tipos de documento son:', tiposDocumento);
        if (tiposDocumento) {
          this.listadoDeDocumentos = JSON.parse(tiposDocumento.VALUE_PARAMETER);
          console.log('Tipos de Documento: ', this.listadoDeDocumentos);
        } else {
          console.log('Error: ', tiposDocumento); // DESPUES
        }
      }, error => {
        console.log('Error tipos de documento: ', error);
      }
    )

  }

  changeDepartments() {
    const departamento = this.listadoDepartamentos.find(departamento =>
      departamento.Code === this.campos.departamentoSeleccionado.valor
    )
    console.log('Departamento seleccionado: ', departamento);
    if (departamento) {
      this.listadoDeCiudades = departamento.Cities;
      this.campos.ciudadSeleccionada.habilitar = false;
    } else {
      console.log('No se encontraron ciudades.') // DESPUES
    }
  }
}

