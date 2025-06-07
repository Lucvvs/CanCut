import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
    IonLabel,
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

  constructor(private fb: FormBuilder) {
    this.agendarForm = this.fb.group({
      nombreMascota: ['', Validators.required],
      edadMascota: ['', [Validators.required, Validators.min(0)]],
      tamanoMascota: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugarEncuentro: ['', Validators.required]
    });

    this.agendarForm.valueChanges.subscribe(() => {
      this.agendarForm.markAllAsTouched();
    });

    this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]'); // ✅ NUEVA LÍNEA
  }

  reservar() {
  if (this.agendarForm.valid) {
    const datos = this.agendarForm.value;

    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(datos);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    this.reservas = reservas; // ✅ Esta línea actualiza la lista en pantalla

    alert(`¡Reserva realizada para ${datos.nombreMascota}!`);
    this.agendarForm.reset();
  }
}
}