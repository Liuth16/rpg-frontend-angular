import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    ReactiveFormsModule,
    CardModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  #messageService = inject(MessageService);
  #fb = inject(FormBuilder);
  #auth = inject(AuthService);
  #router = inject(Router);

  formSubmitted = signal(false);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.formSubmitted.set(true);

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.#auth.login(email!, password!).subscribe({
        next: () => {
          this.#messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logado com sucesso',
            life: 1000,
          });

          setTimeout(() => this.#router.navigate(['/characters']), 1000);
        },
        error: (err) => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.detail || 'Login failed',
            life: 3000,
          });
        },
      });
    }
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }
}
