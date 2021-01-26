import { UtilService } from './../../../Services/util.service';
import { RequestMgl } from './../../../Models/request-mgl';
import { Generalresp } from './../../../Models/generalresp';
import { Documentos } from 'src/app/Models/documentos';
import { Component, OnInit } from '@angular/core';
import { Cities } from 'src/app/Models/cities';
import { Departments } from 'src/app/Models/departments';
import { RespGeneral } from 'src/app/Models/resp-general';
import { CamposService } from 'src/app/Services/campos.service';
import { ServiciosJavaService } from 'src/app/Services/servicios-java.service';
import { ResponseMgl } from 'src/app/Models/response-mgl';


@Component({
  selector: 'app-datos-identificacion',
  templateUrl: './datos-identificacion.component.html',
  styleUrls: ['./datos-identificacion.component.css']
})
export class DatosIdentificacionComponent implements OnInit {
  private respGeneralDepar: RespGeneral;
  private respGeneralDocu: Generalresp[];
  private respGeneralMgl: ResponseMgl;
  public listadoDepartamentos: Departments[];
  public listadoDeCiudades: Cities[];
  public listadoDeDocumentos: Documentos[];


  constructor(
    private servicios: ServiciosJavaService,
    public campos: CamposService,
    public utilService: UtilService

  ) {

    // SESSIONSTORAGE QUEMADAS - QUITAR DESPUÉS
    sessionStorage.setItem('documentType', '1');
    sessionStorage.setItem('documentNumber', '1234567890');
    sessionStorage.setItem('names', 'JuanCamilo Rincón');
    this.validarSessionStoragea();
    }

  ngOnInit(): void {
    this.getDeparatamentosandcites();
    this.postDocumentos();
  }

  validarSessionStoragea(): void {
    this.campos.formDatosIdentificacion.nombres.valor = sessionStorage.getItem('names');
    this.campos.formDatosIdentificacion.tipoDocumentoSeleccionado.valor = sessionStorage.getItem('documentType');
    this.campos.formDatosIdentificacion.noDocumento.valor = sessionStorage.getItem('documentNumber');

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
      departamento.Code === this.campos.formDatosIdentificacion.departamentoSeleccionado.valor
    )
    console.log('Departamento seleccionado: ', departamento);
    if (departamento) {
      this.listadoDeCiudades = departamento.Cities;
      this.campos.formDatosIdentificacion.ciudadSeleccionada.habilitar = false;
    } else {
      console.log('No se encontraron ciudades.') // DESPUES
    }
  }

  putMgl() {
    console.log('Estandarizando dirección.');
    const body = {
      user: "hectorg",
      codigoDane: "11001000",
      direccion: this.campos.formDatosIdentificacion.direccion.valor,
      direccionTabulada: {
        tipoViaPrincipal: "",
        numViaPrincipal: "",
        numViaGeneradora: "",
        placaDireccion: "",
        cpTipoNivel5: "",
        cpValorNivel5: "",
        idTipoDireccion: "CK"
      }
    } as RequestMgl;
    this.servicios.putMGL(body).subscribe(
      data => {
        console.log('Resp mgl: ', data);
        this.respGeneralMgl = data as ResponseMgl;
        if (this.respGeneralMgl.messageType == 'I') {
          // BIEN
          this.campos.formDatosIdentificacion.direccion.valor = this.respGeneralMgl.listAddresses[0].splitAddres.direccionTexto;
        } else {
          // MAL
        }
      }, error => {
        console.log('Error mgl: ', error);
      }
    );

  }

  changeCorreos() {

    this.utilService.validarCorreos(this.campos.formDatosIdentificacion.email);



  }


}


