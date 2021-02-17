import { Component, OnInit } from '@angular/core';
import { CamposService } from 'src/app/Services/campos.service';
import { ServiciosJavaService } from 'src/app/Services/servicios-java.service';
import { UtilService } from './../../../Services/util.service';

@Component({
  selector: 'app-datos-del-equipo',
  templateUrl: './datos-del-equipo.component.html',
  styleUrls: ['./datos-del-equipo.component.css']
})
export class DatosDelEquipoComponent implements OnInit {

  constructor(
    private servicios: ServiciosJavaService,
    public campos: CamposService,
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.validarSessionStorage();
  }

  validarSessionStorage(): void {
    const min = sessionStorage.getItem('min');
    const imei = sessionStorage.getItem('imei');
    const sn = sessionStorage.getItem('serial');

    if (sessionStorage.length > 0) {

      let mensajeFalta = '';

      if (this.utilService.campoLleno(imei)) {
        this.campos.formInformacionEquipo.imei.valor = imei;
        this.campos.formInformacionEquipo.imei.estado = true;
      } else {
        mensajeFalta += ' imei,';
      }
      if (this.utilService.campoLleno(sn)) {
        this.campos.formInformacionEquipo.sn.valor = sn;
        this.campos.formInformacionEquipo.sn.estado = true;
      } else {
        mensajeFalta += ' sn,';
      }
      if (this.utilService.campoLleno(min)) {
        this.campos.formInformacionEquipo.min.valor = min;
        this.campos.formInformacionEquipo.min.estado = true;
      } else {
        this.campos.formDatosIdentificacion.telefono.inhabilitar = false;
      }
      if (this.utilService.campoLleno(mensajeFalta)) {
        this.utilService.lanzarModal(false, 'No se encontraron las variables: ' + mensajeFalta + ' por favor recargue.')
        this.utilService.cambiarEstadoForDatosIdentificacion(true);
      }
      this.getMarcas();
    }
    else {
      this.utilService.lanzarModal(false, 'No se encontraron variables de sesión. Por favor recargue.');
      this.utilService.cambiarEstadoForDatosIdentificacion(true);
    }

  }
  changeColor() {
    this.utilService.validarColor(this.campos.formInformacionEquipo.color);
  }
  getMarcas(){

  }
}
