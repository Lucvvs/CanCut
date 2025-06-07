import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonDatetime,
} from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonDatetime,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{4,20}$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{4,20}$/)]],
      fechaNacimiento: ['', Validators.required],
      comuna: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrar() {
    const nuevoUsuario = this.registroForm.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const yaExiste = usuarios.some((u: any) => u.email === nuevoUsuario.email);
    if (yaExiste) {
      alert('Este correo ya está registrado');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado con éxito');
    this.router.navigate(['/']);
  }
}