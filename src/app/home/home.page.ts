import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonBackButton
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginError: string = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
  const { email, password } = this.loginForm.value;
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuarioValido = usuariosGuardados.find((u: any) => u.email === email && u.password === password);

  if (usuarioValido) {
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
    this.loginError = ''; // limpia el error si hay
    this.router.navigate(['/tabs/inicio']);
  } else {
    this.loginError = 'Correo o contraseña incorrectos'; // ⚠️ muestra mensaje
    this.loginForm.reset();
  }
}


  irARegistro() {
  this.router.navigate(['/registro'], {
    state: { from: 'login' } // 
  });
}
  
}


  