import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRadio,
  IonRadioGroup,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderComponent } from '../components/header/header.component'; 
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonInput,
    HeaderComponent, 
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonRadio,
    IonRadioGroup,
    IonButton,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {
  agendarForm: FormGroup;
  reservas: any[] = [];

  horasDisponibles = [
    '10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','13:30',
    '14:00','14:30','15:00','15:30',
    '16:00','16:30','17:00','17:30',
    '18:00','18:30'
  ];

  sucursales = [
    { nombre: 'Providencia', direccion: 'Nueva Providencia 3131' },
    { nombre: 'Ñuñoa', direccion: 'Irarrázaval 916' },
    { nombre: 'Maipú', direccion: 'Pajaritos 4481' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sqlite: SqliteService,
    private toastCtrl: ToastController
  ) {
    this.agendarForm = this.fb.group({
      nombreMascota: ['', Validators.required],
      edadMascota: ['', [Validators.required, Validators.min(0)]],
      tamanoMascota: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugarEncuentro: ['', Validators.required],
      sucursal: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Carga inicial de reservas del usuario activo
    this.loadReservas();
  }

  private async loadReservas() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    const todas = await this.sqlite.getReservas();
    this.reservas = todas.filter(r => r.emailUsuario === usuario.email);
  }

  async reservar() {
    if (this.agendarForm.invalid) return;

    const datos = this.agendarForm.value;
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');

    // Inserta en SQLite
    await this.sqlite.addReserva({
      nombreMascota: datos.nombreMascota,
      edadMascota: Number(datos.edadMascota),
      tamanoMascota: datos.tamanoMascota,
      fecha: datos.fecha,
      hora: datos.hora,
      lugarEncuentro: datos.lugarEncuentro,
      sucursal: datos.sucursal
    });

    // Asocia el email antes de recargar
    console.log('✅ Reserva almacenada en la BDD para:', usuario.email);

    // Opcional: guardar emailUsuario en la misma tabla si la quieres
    // Para este ejemplo, recargamos el listado local:
    await this.loadReservas();

    // Feedback al usuario
    const toast = await this.toastCtrl.create({
      message: `¡Reserva para ${datos.nombreMascota} registrada!`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();

    this.agendarForm.reset();
    this.router.navigate(['/tabs/perfil']);
  }
}