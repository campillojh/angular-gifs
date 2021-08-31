import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [],
})
export class ResultadosComponent {
  //hago el get de la clase
  get resultados() {
    return this.gifsService.resultados;
  }

  //traigo los servicios del GigService - Par la traer la  la data del array de resultados
  constructor(private gifsService: GifsService) {}
}
