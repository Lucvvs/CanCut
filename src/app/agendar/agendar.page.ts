import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

import {
  IonButton,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonInput,
    IonItem,
    HeaderComponent,
    IonLabel,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonRadio,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonRadioGroup
  ],
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage {
  agendarForm: FormGroup;
  reservas: any[] = []; // ✅ NUEVA LÍNEA

  horasDisponibles: string[] = [
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30'
  ];

  sucursales = [
  {
    nombre: 'Providencia',
    direccion: 'Nueva Providencia 3131',
    mapsUrl: 'https://www.google.com/maps?q=Av.+Nueva+Providencia+3131'
  },
  {
    nombre: 'Ñuñoa',
    direccion: 'Irarrázaval 916',
    mapsUrl: 'https://www.google.com/maps?q=Irarrázaval+916'
  },
  {
    nombre: 'Maipú',
    direccion: 'Pajaritos 4481',
    mapsUrl: 'https://www.google.com/maps?q=Pajaritos+4481'
  }
];
  

  fechaFuturaValidator(control: any) {
  const fechaSeleccionada = new Date(control.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo fecha

  return fechaSeleccionada > hoy ? null : { fechaInvalida: true };
}

  constructor(private fb: FormBuilder, private router: Router) {
    this.agendarForm = this.fb.group({
      nombreMascota: ['', Validators.required],
      edadMascota: ['', [Validators.required, Validators.min(0)]],
      tamanoMascota: ['', Validators.required],
      fecha: ['', [Validators.required, this.fechaFuturaValidator]],
      hora: ['', Validators.required],
      lugarEncuentro: ['', Validators.required],
      sucursal: ['', Validators.required]
    });

    this.agendarForm.valueChanges.subscribe(() => {
      this.agendarForm.markAllAsTouched();
    });

    this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]'); 
  }

  reservar() {
  if (this.agendarForm.valid) {
    const datos = this.agendarForm.value;

    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');

    // Agregar el correo del usuario activo a la reserva
    const nuevaReserva = {
      ...datos,
      emailUsuario: usuarioActivo.email
    };

    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    this.reservas = reservas.filter((r: any) => r.emailUsuario === usuarioActivo.email);

    alert(`¡Reserva realizada para ${datos.nombreMascota}!`);
    this.agendarForm.reset();
    this.router.navigate(['/tabs/perfil']);
  }
}



}