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
    sessionStorage.clear();
    // SESSIONSTORAGE QUEMADAS - QUITAR DESPUÉS
    sessionStorage.setItem('documentType', '1');
    sessionStorage.setItem('documentNumber', '1234567890');
    sessionStorage.setItem('names', 'Juan Camilo Rincón');
    sessionStorage.setItem('min', '312 343 3564');

  }

  ngOnInit(): void {
    this.getDeparatamentosandcites();
    this.postDocumentos();
    this.validarSessionStorage();
  }

  validarSessionStorage(): void {

    const nombres = sessionStorage.getItem('names');
    const noDocumento = sessionStorage.getItem('documentNumber');;
    const tipoDocumento = sessionStorage.getItem('documentType');
    const min = sessionStorage.getItem('min');

    if (sessionStorage.length > 0) {

      let mensajeFalta = '';

      if (this.utilService.campoLleno(nombres)) {
        this.campos.formDatosIdentificacion.nombres.valor = nombres;
        this.campos.formDatosIdentificacion.nombres.estado = false;
      } else {
        mensajeFalta += ' nombres,';
      }
      if (this.utilService.campoLleno(noDocumento)) {
        this.campos.formDatosIdentificacion.noDocumento.valor = noDocumento;
        this.campos.formDatosIdentificacion.noDocumento.estado = false;
      } else {
        mensajeFalta += ' número de documento,';
      }
      if (this.utilService.campoLleno(tipoDocumento)) {
        this.campos.formDatosIdentificacion.tipoDocumentoSeleccionado.valor = tipoDocumento;
        this.campos.formDatosIdentificacion.tipoDocumentoSeleccionado.estado = false;
      } else {
        mensajeFalta += ' tipo de documento,';
      }
      if (this.utilService.campoLleno(min)) {
        this.campos.formDatosIdentificacion.telefono.valor = min;
        this.campos.formDatosIdentificacion.telefono.estado = false;
      } else {
        this.campos.formDatosIdentificacion.telefono.inhabilitar = false;
      }

      if (this.utilService.campoLleno(mensajeFalta)) {
        this.utilService.lanzarModal(false, 'No se encontraron las variables: ' + mensajeFalta + ' por favor recargue.')
        this.utilService.cambiarEstadoForDatosIdentificacion(true);
      }
    }
    else {
      this.utilService.lanzarModal(false, 'No se encontraron variables de sesión. Por favor recargue.');
      this.utilService.cambiarEstadoForDatosIdentificacion(true);
    }

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
          console.log('Error: ', this.respGeneralDepar.message);
          this.utilService.lanzarModal(false, this.respGeneralDepar.message + '. El listado de departamentos no llegó como se esperaba. Por favor recargue.');
          this.utilService.cambiarEstadoForDatosIdentificacion(true);
        }
      }, error => {
        console.log('Error de ciudades y departamentos:', error);
        this.utilService.lanzarModal(false, 'Ocurrió un error durante el proceso de listar los depertamentos. Por favor recargue.');
        this.utilService.cambiarEstadoForDatosIdentificacion(true);
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
          console.log('Error: ', tiposDocumento);
          this.utilService.lanzarModal(false, 'El listado de tipos de documento no llegó como se esperaba. Por favor recargue.');
          this.utilService.cambiarEstadoForDatosIdentificacion(true);
        }
      }, error => {
        console.log('Error tipos de documento: ', error);
        this.utilService.lanzarModal(false, 'Ocurrió un error al listar los tipos de documento. Por favor recargue.');
        this.utilService.cambiarEstadoForDatosIdentificacion(true);
      }
    )

  }

  changeDepartments() {
    const departamento = this.listadoDepartamentos.find(departamento =>
      departamento.Code === this.campos.formDatosIdentificacion.departamentoSeleccionado.valor
    )
    console.log('Departamento seleccionado: ', departamento);
    if (departamento) {
      this.campos.formDatosIdentificacion.objetoDepartamento = departamento;
      this.listadoDeCiudades = departamento.Cities;
      this.campos.formDatosIdentificacion.ciudadSeleccionada.inhabilitar = false;
    } else {
      console.log('No se encontraron ciudades.');
      this.utilService.lanzarModal(false, 'No se encontraron ciudades para el departamento seleccionado. Por favor, seleccione otro departamento.');
    }
  }

  putMgl() {
    console.log('Estandarizando dirección.');
    const body = {
      user: "hectorg",
      codigoDane: this.campos.formDatosIdentificacion.ciudadSeleccionada.valor.padEnd(8, '0'),
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
          this.campos.formDatosIdentificacion.direccion.estado = true;
          this.campos.formDatosIdentificacion.direccion.mensaje = 'Dirección válida';
          this.campos.formDatosIdentificacion.direccion.color = 'success';
          this.campos.formDatosIdentificacion.botonValidarDireccion.inhabilitar = true;
        } else {
          console.log('No se estandarizó la dirección.');
          this.campos.formDatosIdentificacion.direccion.mensaje =  this.respGeneralMgl.message;
          this.campos.formDatosIdentificacion.direccion.color = 'danger';
        }
      }, error => {
        console.log('Error mgl: ', error);
      }
    );

  }

  changeCorreos() {
    this.utilService.validarCorreos(this.campos.formDatosIdentificacion.email);
  }

  changeMin() {
    this.utilService.validarMin(this.campos.formDatosIdentificacion.telefono);
  }

  async changeDireccion() {
    await this.utilService.validarDireccion(this.campos.formDatosIdentificacion.direccion);
    this.habilitarButton();
  }

  habilitarButton() {
    if (this.campos.formDatosIdentificacion.direccion.color == 'secondary') {
      this.campos.formDatosIdentificacion.botonValidarDireccion.inhabilitar = false;
    } else {
      this.campos.formDatosIdentificacion.botonValidarDireccion.inhabilitar = true;
    }
  }

  changeCiudad(){
    console.log('Seleccioné ciudad: ',this.campos.formDatosIdentificacion.ciudadSeleccionada.valor);
  }

}


