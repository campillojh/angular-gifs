import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  //segundo creo el getter
  get historial() {
    return this.gifservice.historial;
    //puedo acceder al array hostorial an injecttar el GifService
  }
  //para delplegar en el sidebar las busquedas
  //Primero inyecto el servicios PARA PODER PONER EL ARRAY  LOS DATOS DE
  //LA BUSQUEDA EN EL SIDEBAR
  constructor(private gifservice: GifsService) {}

  //creo elmetodo buscar item  para poder llamar las busquedas almacenadas en
  //el sidebar.
  buscar(termino: string) {
    console.log(termino);
    //le asigno a la busqueda el nuevo termino- como ya esta importado el servicio Gifservice en el cosntructor
    this.gifservice.buscarGifs(termino);
  }
}
