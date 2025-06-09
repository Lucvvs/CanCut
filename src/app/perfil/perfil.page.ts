import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Importamos Router
import { HeaderComponent } from '../components/header/header.component';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
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
    IonList,
    IonItem,
    IonLabel,
    IonText
  ]
})
export class PerfilPage {
  reservas: any[] = [];

  constructor(private router: Router) {} // ✅ Constructor con Router

  ionViewWillEnter() {
    const reservasGuardadas = localStorage.getItem('reservas');
    this.reservas = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
  }
}