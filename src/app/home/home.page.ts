import { Component } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginError = '';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sqlite: SqliteService,
    private toastCtrl: ToastController,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // desplazamiento automatico
  ionViewWillEnter() {
    Keyboard.setScroll({ isDisabled: false });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginError = 'Completa todos los campos';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const valid = await this.sqlite.authenticate(email, password);
      if (valid) {
        console.log(`♥ Usuario ${email} encontrado y validado en la BDD`);
        const user = await this.sqlite.getUsuario(email);

        // guardar sesion y navegar
        this.auth.login(user);
        this.loginError = '';
      } else {
        this.loginError = 'Correo o contraseña incorrectos';
        this.loginForm.reset();
      }
    } catch (e) {
      console.error(e);
      const toast = await this.toastCtrl.create({
        message: 'Error al conectar con la base de datos',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }


  onFocusScroll(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}