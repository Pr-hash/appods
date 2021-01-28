import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoServicio } from '../Models/info-servicio';
import { RequestMgl } from '../Models/request-mgl';
import { CamposService } from './campos.service';
import { HttpGenericoService } from './http-generico.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosJavaService {

  infoServicio = {} as InfoServicio;

  constructor(
    private httpGenerico: HttpGenericoService,
    private util: UtilService,
    public campos: CamposService,
  ) { }

  // funcion especial ya que carga los parametros necesarios
  getParameter(data: string, detallerError: string) {
    this.infoServicio = {
      descripcion: 'consultar parámetros',
      detallerError
    };
    const URL = this.util.ajustarURL(environment.urlParam, '', '', data);
    return this.httpGenerico.post(URL, null, this.infoServicio, false);
  }

  getCitiesDepartaments() {
    this.infoServicio = {
      descripcion: 'consultar departamentos',
      detallerError: 'No se logró traer los departamentos'
    }

    const URL = this.util.ajustarURL(JSON.parse(this.campos.paramWsRest.VALUE_PARAMETER).WsImeiTools, 'Cities_Departaments', '', 'Get', this.header());
    return this.httpGenerico.get(URL, this.infoServicio);
  }

  putMGL(body: RequestMgl) {
    this.infoServicio = {
      descripcion: 'estandarizar dirección',
      detallerError: 'No se logró estandarizar la dirección digitada'
    };
    const URL = this.util.ajustarURL(JSON.parse(this.campos.paramWsRest.VALUE_PARAMETER).Address, 'consultaDireccionGeneral', JSON.stringify(body), 'Get', this.header());
    return this.httpGenerico.put(URL, body, this.infoServicio);
  }

  header() {
    const header = 'transactionId=string&system=string&target=string&user=string&requestDate=' +
      new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString() +
      '&ipApplication=string&traceabilityId=string';
    return header;
  }

}
