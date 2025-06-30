import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SqliteService } from '../services/sqlite.service';
import { HeaderComponent } from '../components/header/header.component';
import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
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
    IonLabel,
    IonButton,
    HeaderComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sqlite: SqliteService) {
    this.registroForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{3,20}$/),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]{4,20}$/),
        ],
      ],
      fechaNacimiento: [
        '',
        [
          Validators.required,
          this.fechaMayorA5AniosValidator(),
        ],
      ],
      comuna: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{4,30}$/),
          this.maxEspaciosValidator(5),
        ],
      ],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
        ],
      ],
      email: [
  '',
  [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl|org|net|edu|gov|mil|info|biz|co)$/)
  ],
],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        ],
      ],
    });
  }

  // Validador verifica edad mínima 5
  fechaMayorA5AniosValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const fecha = new Date(control.value);
      const hoy = new Date();
      const hace5Anios = new Date(hoy.getFullYear() - 5, hoy.getMonth(), hoy.getDate());
      return fecha <= hace5Anios ? null : { menorDeEdad: true };
    };
  }

  // Validador para cantidad de espacio
  maxEspaciosValidator(max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const texto = control.value || '';
      const espacios = (texto.match(/ /g) || []).length;
      return espacios <= max ? null : { demasiadosEspacios: true };
    };
  }

  // mensaje de error 
  getError(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (!control || !control.touched || !control.errors) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['pattern']) {
      switch (controlName) {
        case 'nombre':
          return 'Debe tener solo letras (3 a 20)';
        case 'apellido':
          return 'Debe tener solo letras (4 a 20)';
        case 'password':
          return 'Debe incluir al menos 1 letra y 1 número';
        case 'comuna':
          return 'Utiliza solo letras y comuna valida';
      }
    }
    if (control.errors['minlength']) return `Debe tener mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Debe tener máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['email']) return 'Correo no válido';
    if (control.errors['menorDeEdad']) return 'Debes tener al menos 5 años';
    if (control.errors['demasiadosEspacios']) return 'Formato invalido';
    
    return 'Campo inválido';
  }

  async registrar() {
  if (this.registroForm.invalid) {
    this.registroForm.markAllAsTouched();
    return;
  }

  const nuevoUsuario = this.registroForm.value;

  try {
    const usuariosExistentes = await this.sqlite.getUsuarios();
    const yaExiste = usuariosExistentes.some(u => u.email === nuevoUsuario.email);

    if (yaExiste) {
      alert('Este correo ya está registrado');
      return;
    }

    await this.sqlite.addUsuario(nuevoUsuario);
    localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));

    alert('Usuario registrado con éxito');
    this.registroForm.reset();
    this.router.navigate(['/']);
  } catch (e) {
    console.error('Error al registrar en SQLite:', e);
  }
}
}