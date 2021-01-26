
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
    } else{
      email.mensaje = 'Correo válido';
    email.color = 'success';
    email.estado = true;
    }
  }
}
