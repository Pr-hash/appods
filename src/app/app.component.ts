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
export class AppComponent implements OnInit {

  begin: boolean = undefined;
  responseParameters: RespParameters;

  constructor(
    private servicios: ServiciosJavaService,
    private util: UtilService,
    public campos: CamposService,
  ) {
    const errorM = 'No se logró consultar los parámetros necesarios';
    this.servicios.getParameter('45_0', errorM).subscribe(
      data => {
        console.log('Parámetros: ', data);
        if (util.campoLleno(data) && data.length > 0) {
          this.begin = true;
          this.responseParameters = new RespParameters;
          this.responseParameters.parameters = [];
          this.responseParameters.parameters = data;
          this.loadParameters();
        } else {
          this.begin = false;
          util.lanzarModal(false, errorM + '.');
        }
      }, error => {
        this.begin = false;
        console.log('Error consulta parámetros: ', error);
        util.lanzarModal(false, errorM + '.');
      }
    );
    setTimeout(() => {
      if (!this.begin) {
        this.begin = false;
      }
    }, 7000);
  }

  ngOnInit(): void {

  }

  loadParameters() {
    /* ENCONTRAR PARAMETROS
    NAME = NOMBRE QUE TIENE LA VARIABLE EN campos.service
    NAMEBD =  NOMBRE QUE SE ENCUENTRA EN LA BASE DE DATOS */
    const varParams = [
      { name: 'paramTiposEquipo', nameBD: 'EQUIPMENT_TYPES' },
      { name: 'paramTiposCliente', nameBD: 'CLIENT_TYPES' },
      { name: 'paramTiposDocumentos', nameBD: 'DOCUMENT_TYPES' },
      { name: 'paramCondicionesGaran', nameBD: 'WARRANTY_CONDITIONAL' },
      { name: 'paramWsCustomer', nameBD: 'WS_CUSTOMER_PRODUCT' },
      { name: 'paramPreguntas', nameBD: 'QUESTIONS' },
      { name: 'paramWsHistorico', nameBD: 'WS_QUERY_HISTORICAL' },
      { name: 'paramWsSapInventory', nameBD: 'WS_SAP_INVENTORY' },
    ];

    varParams.forEach(varParam => {
      this.campos[varParam.name] = this.responseParameters.parameters.find(element => element.NAME_PARAMETER.indexOf(varParam.nameBD) > -1);
    });

  }
}
