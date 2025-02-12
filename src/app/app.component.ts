import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, RouterLink ],
  template:
    `
    <!-- Se muestra el header en todas las vistas -->
    <app-header></app-header>
    <!-- El contenido de la ruta se renderiza aquí -->
    <router-outlet></router-outlet>
  `,

})
export class AppComponent {


}
