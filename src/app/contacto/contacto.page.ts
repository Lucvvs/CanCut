import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonTextarea,
    IonHeader,
    IonToolbar,
    IonTitle,
    HeaderComponent
  ],
})
export class ContactoPage {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  enviar() {
    if (this.contactoForm.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    console.log('Mensaje enviado:', this.contactoForm.value);
    alert('¡Gracias por contactarnos!');
    this.contactoForm.reset();
    this.router.navigate(['/tabs/inicio']);
  }

  cancelar() {
    this.router.navigate(['/tabs/inicio']);
  }
}