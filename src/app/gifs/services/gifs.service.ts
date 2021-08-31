import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

//EL SERVICIO SE CREA PARA PODER ALMACENAR LOS RESULTADOS DE LAS BUSQUEDAS DE GIFS
@Injectable({
  providedIn: 'root',
  //Permite que los servicios estan definidos en el momento en el que se Construye el bundle
  // de la apalicacion.Le dice a angular que ese servicio independiente de su ubicacion
  //va estar de manera global - providedIn: 'root'
})
export class GifsService {
  //defino los parametros del API
  private apiKey: string = '6ZEWG64L57qKk4UvlzybfRusvLBHcezU';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  //creo porpiedad privada para almacenar los string del input
  private _historial: string[] = [];

  //ALMACENO LA DATA RETORNADA POR EL HTTP
  //TODO:Cambiar any por su tipo correspondiente
  //Pongo el tipo de datos Gif de la interface
  public resultados: Gif[] = [];

  //hago el getter del historial
  get historial() {
    //Permitir que solo muestre 10 elementos del arreglo"10 busquedas"
    //this._historial = this._historial.splice(0, 10);

    //Rompo la relacion - Se pone el sped operator ... para que cree un nuevo arreglo y no sea modificado
    // si se modifica la propiedad historial()
    return [...this._historial];
  }
  //creo instancias del serciocio HttpCliente importado desde el app.module.ts

  constructor(private http: HttpClient) {
    //MIRO EL CONTENIDO DEL LOCALSTORAGE - pero lo verifico

    //SEGUNDA FORMA DE HACERLO- LE DIGO QUE PUEDE RETORNAL NULL O UN AREGLO VACIO. CONFIE !
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    console.log(this.resultados);
    console.log(this.historial);

    // Primera forma de hacerlo
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // el signo ! de admiracion le  dice a TS QUE  CONFIE QUE EL DATO ('historial') siempre va estar nuca va aser "Null"
    //}
  }

  //insertar valores- CREO EL METODO-  - lo envio al componenete busqueda
  //ENVIO ESTE METODO AL COMPONENTE busqueda.componente.ts
  buscarGifs(query: string) {
    //que iguala mayusculas y minusculas en el input - luego lo capitalizo con un pipe | en el html del sidebar
    query = query.trim().toLocaleLowerCase();

    //EVALUA REPETIDOS EN EL EN ARRAY
    //No recibir datos repetidos- include pregunta si existe- pero negado !
    //no no existe
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      //Paso el avaluador de cantidad  A 10 aqui para priemEro insertar y luego cortar EL ARRAY.
      this._historial = this._historial.splice(0, 10);

      //GRABACION EN EL LOCAL STORAGE - SOLO PUEDO GARBAR STRING- CON EL JSON.stringify CONVIERTO A STRING
      localStorage.setItem('historial', JSON.stringify(this._historial));

      //AL REFRESCAR EL NAVEGADOR  EN EL LOCALSTORAGE PERMENECE LOS DATOS PERO EN EL SIDEBAR SE BORRRAN
      // QUY QUE RECUPERARLOS PARA EL SIDEBAR DESDE EL CONTRUCTOR POR QUE SOLO SE EJECUTA UNA VEZ
    }

    //HAGO EL LLAMADO A LA API - ESTILO JS
    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=6ZEWG64L57qKk4UvlzybfRusvLBHcezU&q=vegueta&limit=10'
    // ).then((resp) => {
    //   resp.json().then((data) => {
    //     console.log(data);
    //   });
    // });
    //console.log(this._historial);

    //Creo los Paramentros del http request
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    //muestra el objeto como string
    console.log(params.toString());

    //LLAMO PA T\PETICION HTTTP CON OBSERVABLE de rxjs. el modulose IMPORTA EN EL APP.MODULE.TS
    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      //{ params:params }
      //con typo:any solo responde la data que es es lo que se necesita independiente que
      //sea cualquier tipo de dato.
      .subscribe((resp) => {
        console.log(resp.data);
        //asigno los resultados al arreglo creado arriba
        this.resultados = resp.data;
        //imagenes- automaticas en el localstorage,
        // se pone qui por que es cuando seobtiene la repuesta del request http
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}

//PARA CREAR TIPADO ME TOCA CREAR UNA INTERFACE
// LA CREO TRAYENDO LOS DATOS DESDE POSTMAN, LOS COPIO
//Y LOS PEGO EN LA PAGINA http://https://app.quicktype.io
//LO VUELVO TS Y YA CONVERTIDO LO PEGO EN LA INTERFACE.
//YA CREADO ESTO  CAMBIO  EL TYPO DE DATO EN .subscribe((resp: any)
//POR  .subscribe((resp: SearchGifsResponse) =>  que se exporta de la interface
//PERO SE RECOIMEINDA PONERLA EN EL  **** this.http.get<SearchGifsResponse>(....
// LE DICE TS QUE LA .subscribe((resp) => LUCE COMO  LA INTERFACE <SearchGifsResponse>
// tambien toca cambiar el tipo de datos de  public resultados: any[] = [];
