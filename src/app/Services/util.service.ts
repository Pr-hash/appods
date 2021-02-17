import { Injectable, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampoGeneral } from '../Models/campo-general';
import { CamposService } from './campos.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  @BlockUI() blockUI: NgBlockUI;
  alerta = {} as Alerta;
  regexpEmail = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$');

  constructor(
    public dialog: MatDialog,
    private campos: CamposService,
  ) { }

  validarCorreos(email: CampoGeneral) {
    if (email.valor == '') {
      email.mensaje = 'El correo no debe estar en vacío';
      email.color = 'danger';
      email.estado = false;

    } else if (!this.regexpEmail.test(email.valor)) {
      email.mensaje = 'Correo no válido, digite de nuevo';
      email.color = 'danger';
      email.estado = false;
    } else {
      email.mensaje = 'Correo válido';
      email.color = 'success';
      email.estado = true;
    }
  }

  campoLleno(campo: any): boolean {
    if (campo === null || campo === '' || campo === ' ' || campo === '  ' || campo === undefined) {
      return false;
    } else {
      return true;
    }
  }

  caracteresNumerico(event) {
    console.log('Tecla digitada:', event.charCode);
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    } else {
      return false;
    }
  }
  // this.campos.formDatosIdentificacion.telefono.valor.length < 8

  validarMin(telefono: CampoGeneral) {
    if (telefono.valor == '') {
      telefono.mensaje = 'Digite un número telefónico';
      telefono.color = 'danger';
      telefono.estado = false;
    } else if (telefono.valor.length < 8) {
      telefono.mensaje = 'Un número telefónico debe de tener mínimo 8 caracteres ';
      telefono.color = 'danger';
      telefono.estado = false;
    } else {
      telefono.mensaje = 'Número telefónico válido';
      telefono.color = 'success';
      telefono.estado = true;
    }
  }
  validarColor(color: CampoGeneral) {
    if (color.valor == '') {
      color.mensaje = 'Digite un color';
      color.color = 'danger';
      color.estado = false;
    } else if (color.valor.length >= 50) {
      color.mensaje = 'Un colo no debe de tener mas de 50 caracteres ';
      color.color = 'danger';
      color.estado = false;
    } else {
     color.mensaje = 'Color válido';
     color.color = 'success';
     color.estado = true;
    }
  }

  caracteresAlfanumerico(event) {
    if ((event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      (event.charCode >= 45 && event.charCode <= 46) ||
      (event.charCode >= 48 && event.charCode <= 57) ||
      (event.charCode === 32) || (event.charCode === 35)) {
      return true;
    } else {
      return false;
    }
  }

  caracteresCorreo(event) {
    if ((event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      (event.charCode >= 48 && event.charCode <= 57) ||
      (event.charCode === 64) ||
      (event.charCode === 46) ||
      (event.charCode === 95) ||
      (event.charCode == 45)) {
      return true;
    } else {
      return false;
    }
  }

  validarDireccion(direccion: CampoGeneral) {
    if (!this.campoLleno(direccion.valor)) {
      direccion.mensaje = 'Digite un dirección';
      direccion.color = 'danger';
      direccion.estado = false;
    } else if (direccion.valor.length < 3) {
      direccion.mensaje = 'Digite un dirección válida';
      direccion.color = 'danger';
      direccion.estado = false;
    } else {
      direccion.mensaje = 'Dirección válida. Por favor validar';
      direccion.color = 'secondary';
    }
  }

  desbloquearUI() {
    this.blockUI.stop();
  }

  bloquearUI() {
    this.blockUI.start();
  }

  limpiarModal() {
    this.alerta = {
      color: '',
      texto: '',
      icono: '',
    };
  }

  lanzarModal(positiva: boolean, mensaje: string) {
    this.alerta.texto = mensaje;
    if (positiva) {
      this.alerta.color = 'mensaje-positivo';
      this.alerta.icono = 'fa fa-check-circle';
    } else {
      this.alerta.color = 'mensaje-negativo';
      this.alerta.icono = 'fa fa-info-circle';
    }
    this.dialog.open(modalMensajes, { panelClass: this.alerta.color, data: this.alerta });
  }

  cambiarEstadoForDatosIdentificacion(estado: boolean): void {
    this.campos.formDatosIdentificacion.nombres.inhabilitar = estado;
    this.campos.formDatosIdentificacion.tipoDocumentoSeleccionado.inhabilitar = estado;
    this.campos.formDatosIdentificacion.noDocumento.inhabilitar = estado;
    this.campos.formDatosIdentificacion.telefono.inhabilitar = estado;
    this.campos.formDatosIdentificacion.email.inhabilitar = estado;
    this.campos.formDatosIdentificacion.departamentoSeleccionado.inhabilitar = estado;
    this.campos.formDatosIdentificacion.ciudadSeleccionada.inhabilitar = estado;
    this.campos.formDatosIdentificacion.direccion.inhabilitar = estado;
    this.campos.formInformacionEquipo.centrodeatencion.inhabilitar = estado;
    this.campos.formInformacionEquipo.color.inhabilitar = estado;
    this.campos.formInformacionEquipo.distribudorcentroingreso.inhabilitar = estado;
    this.campos.formInformacionEquipo.doa.inhabilitar = estado;
    this.campos.formInformacionEquipo.fechadecompra.inhabilitar = estado;
    this.campos.formInformacionEquipo.fechadeingreso.inhabilitar = estado;
    this.campos.formInformacionEquipo.horadeingreso.inhabilitar = estado;
    this.campos.formInformacionEquipo.imei.inhabilitar = estado;
    this.campos.formInformacionEquipo.marca.inhabilitar = estado;
    this.campos.formInformacionEquipo.min.inhabilitar = estado;
    this.campos.formInformacionEquipo.modelo.inhabilitar = estado;
    this.campos.formInformacionEquipo.periododegarantia.inhabilitar = estado;
    this.campos.formInformacionEquipo.servicio.inhabilitar = estado;
    this.campos.formInformacionEquipo.sn.inhabilitar = estado;
    this.campos.formInformacionEquipo.tipodeprestamo.inhabilitar = estado;
  }


  ajustarURL(str: string, ...args: string[]) {
    return str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
  }


}

interface Alerta {
  color: string;
  icono: string;
  texto: string;
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './../Shared/Components/modal-mensajes/modal-mensajes.component.html',
})

export class modalMensajes {
  constructor(
    public dialogRef: MatDialogRef<modalMensajes>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
