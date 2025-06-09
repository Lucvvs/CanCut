import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  volverAtras() {
    const currentUrl = this.router.url;
    if (currentUrl === '/tabs/inicio') {
      this.router.navigate(['']);
    } else {
      window.history.back();
    }
  }

  irAContacto() {
    this.router.navigate(['/contacto']);
  }
}