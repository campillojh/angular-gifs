import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
//Primero creo el modulo
//segundo creo el componente
//creo el sidebar.component.html
//tercero  exporto el componente desed el modulo
//cuarto exporto la clase al app.module.ts- importo
//llamo  el compornente app-sidebar desde el  app.componenet.html
@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule],
})
export class SharedModule {}

//moduleo share comparte imformacion como menues - footer o sidebar
