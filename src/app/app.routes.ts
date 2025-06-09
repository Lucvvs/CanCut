import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // Página principal al iniciar
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then(m => m.InicioPage),
  },
  {
    path: 'agendar',
    loadComponent: () => import('./agendar/agendar.page').then(m => m.AgendarPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then(m => m.PerfilPage),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then(m => m.ContactoPage),
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];