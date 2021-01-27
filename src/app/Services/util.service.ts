
import { Injectable } from '@angular/core';
import { CampoGeneral } from 'src/app/Models/campo-general';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  regexpEmail = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$');
  constructor() { }

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

  validarDireccion(direccion: CampoGeneral) {
    console.log('Dirección: ', !this.campoLleno(direccion.valor))
    if (!this.campoLleno(direccion.valor)) {
      direccion.mensaje = 'Digite un dirección';
      direccion.color = 'danger';
      direccion.estado = false;
    } else if (direccion.valor.length < 3) {
      direccion.mensaje = 'Digite un dirección válida';
      direccion.color = 'danger';
      direccion.estado = false;
    } else {
      direccion.mensaje = 'Dirección válida';
      direccion.color = 'success';
      direccion.estado = true;
    }
  }

}
