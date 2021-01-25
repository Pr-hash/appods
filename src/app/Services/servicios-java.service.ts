import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosJavaService {

  constructor(
    private http: HttpClient
  ) { }

  getCitiesDepartaments() {
    const URL = 'http://100.126.19.74:8091/DEVQA/WsImeiTools/api/ImeiTools/ResourcesDomainApp_GET?getOperation=Cities_Departaments&message=""';
    return this.http.get(URL);
  }

}
