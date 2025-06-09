import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    HeaderComponent,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonText
  ]
})
export class PerfilPage {
  reservas: any[] = [];
  usuario: any = {};

  constructor(private router: Router) {}

  ionViewWillEnter() {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
  const todasLasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');

  // Filtrar solo las reservas del usuario activo
  this.reservas = todasLasReservas.filter((r: any) => r.emailUsuario === usuarioActivo.email);

  this.usuario = usuarioActivo;
}
}