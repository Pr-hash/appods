export interface ResponseMgl {
  type: string;
  message: string;
  messageType: string;
  idCentroPoblado: string;
  centroPoblado: string;
  listAddresses: ListAddress[];
}


interface SplitAddres {
  idDireccionDetallada: string;
  tipoViaPrincipal: string;
  numViaPrincipal: string;
  ltViaPrincipal: string;
  numViaGeneradora: string;
  placaDireccion: string;
  direccionTexto: string;
  direccionId: number;
}

interface ListAddress {
  splitAddres: SplitAddres;
}

