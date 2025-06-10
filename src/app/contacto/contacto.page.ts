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
  IonText,
  IonTextarea,
  IonSelect,
  IonSelectOption,
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
    IonText,
    IonSelect,
    IonSelectOption,
    HeaderComponent
  ],
})
export class ContactoPage {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^.{5,30}$/)]],
      email: ['', [Validators.required, Validators.email]],
      tipoSolicitud: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });
  }

  enviar() {
    if (this.contactoForm.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    console.log('Formulario enviado:', this.contactoForm.value);
    alert('¡Gracias por contactarnos!');
    this.contactoForm.reset();
    this.router.navigate(['/tabs/inicio']);
  }

  cancelar() {
    this.contactoForm.reset(); 
  }
}