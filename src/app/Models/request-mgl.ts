export interface RequestMgl {
  user: string;
  codigoDane: string;
  direccion: string;
  direccionTabulada: DireccionTabulada;
}

interface DireccionTabulada {
  tipoViaPrincipal: string;
  numViaPrincipal: string;
  numViaGeneradora: string;
  placaDireccion: string;
  cpTipoNivel5: string;
  cpValorNivel5: string;
  idTipoDireccion: string;
}


