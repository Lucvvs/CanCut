import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  ]
})
export class InicioPage implements OnInit {

  sucursales = [
    { nombre: 'Providencia', direccion: 'Av. Nueva Providencia 1234' },
    { nombre: 'Ñuñoa', direccion: 'Irarrázaval 987' },
    { nombre: 'Maipú', direccion: 'Pajaritos 4567' },
  ];

  servicios = [
    { nombre: 'Baño y Cepillado', precio: 10000 },
    { nombre: 'Corte completo', precio: 15000 },
    { nombre: 'Baño antipulgas', precio: 12000 },
  ];

  constructor() { }

  ngOnInit() { }
}