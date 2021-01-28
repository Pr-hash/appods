import { Component, OnInit } from '@angular/core';
import { RespParameters } from './Models/resp-parameters';
import { CamposService } from './Services/campos.service';
import { ServiciosJavaService } from './Services/servicios-java.service';
import { UtilService } from './Services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  responseParameters: RespParameters;
  begin: boolean = undefined;
  beginAux: boolean = undefined;
  strGroups = ['45_0'];
  contador = 0;

  constructor(
    private servicios: ServiciosJavaService,
    private util: UtilService,
    public campos: CamposService,
  ) {
    const errorM = 'No se logró consultar los parámetros necesarios';

    this.strGroups.forEach(strGroup => {
      this.contador++;
      this.servicios.getParameter(strGroup, errorM).subscribe(
        data => {
          console.log('Parámetros: ', data);
          if (util.campoLleno(data) && data.length > 0) {
            this.beginAux = true;
            this.responseParameters = new RespParameters;
            this.responseParameters.parameters = [];
            this.responseParameters.parameters = data;
            this.loadParameters();
          } else {
            this.beginAux = false;
            util.lanzarModal(false, errorM + '.');
          }
        }, error => {
          this.beginAux = false;
          console.log('Error consulta parámetros: ', error);
          util.lanzarModal(false, errorM + '.');
        }
      );
    });

    this.loadBeginComponent();
  }

  loadBeginComponent() {
    setTimeout(() => {
      if (this.contador == this.strGroups.length && this.beginAux != undefined) {
        this.begin = this.beginAux;
      } else {
        this.loadBeginComponent();
      }
    }, 1000);
  }

  loadParameters() {
    /* ENCONTRAR PARAMETROS
    NAME = NOMBRE QUE TIENE LA VARIABLE EN campos.service
    NAMEBD =  NOMBRE QUE SE ENCUENTRA EN LA BASE DE DATOS */
    const varParams = [
      { name: 'paramTiposDocumentos', nameBD: 'DOCUMENT_TYPES' },
      { name: 'paramWsRest', nameBD: 'WS_REST' },
    ];

    varParams.forEach(varParam => {
      if (this.campos[varParam.name] == undefined) {
        this.campos[varParam.name] = this.responseParameters.parameters.find(element => element.NAME_PARAMETER.indexOf(varParam.nameBD) > -1);
      }

    });

  }
}
