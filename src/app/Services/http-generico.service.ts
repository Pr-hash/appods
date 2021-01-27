import { catchError, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { InfoServicio } from '../Models/info-servicio';
import { UtilService } from './util.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsAlter = {
  headers: new HttpHeaders({
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpGenericoService {

  constructor(
    public http: HttpClient,
    private util: UtilService
  ) { }

  get(endPoint: string, infoServicio: InfoServicio): Observable<any> {
    this.util.bloquearUI();
    return this.http.get(endPoint)
      .pipe(
        catchError(err => {
          return this.onCatchError(err, infoServicio);
        }),
        finalize(() => {
          this.util.desbloquearUI();
        })
      );
  }

  post(endPoint: string, body: any, infoServicio: InfoServicio, soap: boolean): Observable<any> {
    this.util.bloquearUI();
    const auxHttpOption = soap ? httpOptionsAlter : httpOptions;
    return this.http.post(endPoint, body, auxHttpOption)
      .pipe(
        catchError(err => {
          return this.onCatchError(err, infoServicio);
        }),
        finalize(() => {
          this.util.desbloquearUI();
        })
      );
  }

  put(endPoint: string, body: any, infoServicio: InfoServicio): Observable<any> {
    this.util.bloquearUI();
    return this.http.put(endPoint, body, httpOptions)
      .pipe(
        catchError(err => {
          return this.onCatchError(err, infoServicio);
        }),
        finalize(() => {
          this.util.desbloquearUI();
        })
      );
  }

  private onCatchError(response: { status: number; }, errors: InfoServicio): Observable<any> {
    this.util.limpiarModal();

    if (errors.detallerError === '') {
      errors.detallerError = 'sin descripción';
    }

    this.util.alerta = {
      color: 'alerta-negativa',
      icono: 'fas fa-exclamation-triangle',
      texto: ''
    };
    let mensaje = '';
    mensaje = mensaje + 'Error  al ' + errors.descripcion;
    if (response.status === 200) {
      return throwError(response);
    } else if (response.status === 0) {
      mensaje = mensaje + ', no hay conexión con el servidor. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 400) {
      mensaje = mensaje + ', parámetro(s) erróneo(s) para el servicio. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 401) {
      this.util.lanzarModal(false, 'Su sesión ha caducado');
    } else if (response.status === 403) {
      mensaje = mensaje + ', no se autorizado para acceder a este recurso. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 404) {
      mensaje = mensaje + ', recurso no encontrado. Detalle: ' + errors.detallerError;
      this.util.alerta.texto = mensaje;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 405) {
      mensaje = mensaje + ', método del servicio no corresponde. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 415) {
      mensaje = mensaje + ', error en el formato soportado para el servicio. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else if (response.status === 500) {
      mensaje = mensaje + ', error del sistema: por favor contacte al administrador. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    } else {
      mensaje = mensaje + ', error inesperado. Detalle: ' + errors.detallerError;
      this.util.lanzarModal(false, mensaje);
      return EMPTY;
    }
    return throwError(response);
  }
}
