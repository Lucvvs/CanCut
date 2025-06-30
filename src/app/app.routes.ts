import { Routes } from '@angular/router';
import { authGuardGuard } from './services/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',           
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'registro',  
    loadComponent: () =>
      import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'contacto',   
    loadComponent: () =>
      import('./contacto/contacto.page').then(m => m.ContactoPage),
  },
  {
    path: 'tabs',      
    loadComponent: () =>
      import('./tabs/tabs.page').then(m => m.TabsPage),
    canActivate: [authGuardGuard],
    canActivateChild: [authGuardGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./inicio/inicio.page').then(m => m.InicioPage),
      },
      {
        path: 'agendar',
        loadComponent: () =>
          import('./agendar/agendar.page').then(m => m.AgendarPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./perfil/perfil.page').then(m => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',         
    redirectTo: '',
    pathMatch: 'full'
  }
];