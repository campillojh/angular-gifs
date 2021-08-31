import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  //creo el metoso buscar
  //buscar(event: any) retorna KeyboardEevent
  // buscar(event: KeyboardEvent) {
  //   console.log(event.);
  // } Solo interesa capturar el valor

  //Para poder borrar el contenido del input. por que si le asigno  termino=""
  //en realidad no se borra- uso el decorador @ViewChild()
  //Busca por elementos html o por calses por referencia locales
  //Le pongo el signo de admiracion ! "non null asceptio operator"
  //para que TS confien en que el dato nunca v a ser null
  //<HTMLInputElement> perimite usar los metodos del typado  nativeElement.value , etc
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //pra usar el servicio vamos a utilizar injectable
  //Con el constructor traigo del servicio buscarGifs- con la class GifsService
  // - creo el constructor con un nombre y tipo
  constructor(private gifservice: GifsService) {}

  //metodo
  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    //tengo el valor del input
    // llamo la propiedad de buscar y le mando el valor para que lo almacene

    //Controlo Inserciones Vacias - si es vacio no haga nada
    //TRIM EVITAS LOS ESPCIOS ADELANTE Y ATRAS
    if (valor.trim().length === 0) {
      return;
    }

    this.gifservice.buscarGifs(valor);
    // Retorna ElementRef {nativeElement: input.form-control}
    //asigno vacio al input - al dar enter el input queda limpio
    this.txtBuscar.nativeElement.value = '';
  }
}
