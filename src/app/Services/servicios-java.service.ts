import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoServicio } from '../Models/info-servicio';
import { RequestMgl } from '../Models/request-mgl';
import { HttpGenericoService } from './http-generico.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosJavaService {

  infoServicio = {} as InfoServicio;

  constructor(
    private http: HttpClient,
    private httpGenerico: HttpGenericoService,
    private util: UtilService,
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
    };
    const URL = 'http://100.126.19.74:8091/DEVQA/WsImeiTools/api/ImeiTools/ResourcesDomainApp_GET?getOperation=Cities_Departaments&message=""';
    return this.httpGenerico.get(URL, this.infoServicio);
  }

  putMGL(body: RequestMgl) {
    this.infoServicio = {
      descripcion: 'estandarizar dirección',
      detallerError: 'No se logró estandarizar la dirección digitada'
    };
    const URL = 'http://100.126.0.150:12272/CMatricesAs400Services-war/webresources/address/consultaDireccionGeneral';
    return this.httpGenerico.put(URL, body, this.infoServicio);
  }

}
