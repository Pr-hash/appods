import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoServicio } from '../Models/info-servicio';
import { RequestMgl } from '../Models/request-mgl';
import { HttpGenericoService } from './http-generico.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosJavaService {

  infoServicio = {} as InfoServicio;

  constructor(
    private http: HttpClient,
    private httpGenerico: HttpGenericoService,
  ) { }

  getCitiesDepartaments() {
    this.infoServicio = {
      descripcion: 'consultar departamentos',
      detallerError: 'No se logró traer los departamentos'
    };
    const URL = 'http://100.126.19.74:8091/DEVQA/WsImeiTools/api/ImeiTools/ResourcesDomainApp_GET?getOperation=Cities_Departaments&message=""';
    return this.httpGenerico.get(URL, this.infoServicio);
  }
  postDocumentos() {
    this.infoServicio = {
      descripcion: 'consultar parámetros',
      detallerError: 'No se logró traer los parámetros'
    };
    const URL = 'http://100.126.19.9:8300/CRMUtilServicesv1/api/Parameter?strGroup=45_1';
    return this.httpGenerico.post(URL, null, this.infoServicio, false);
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
