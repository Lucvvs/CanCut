import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // Página principal al iniciar (login)
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then(m => m.ContactoPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
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
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'tabs/inicio',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  }
];