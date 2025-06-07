import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonText
  ]
})
export class PerfilPage {
  reservas: any[] = [];

  ionViewWillEnter() {
    const reservasGuardadas = localStorage.getItem('reservas');
    this.reservas = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];
  }


volverAtras() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/inicio'; // o Router.navigate
  }
}

}