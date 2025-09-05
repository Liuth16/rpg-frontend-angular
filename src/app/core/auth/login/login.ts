import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

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

  formSubmitted = signal(false);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.formSubmitted.set(true);
    if (this.loginForm.valid) {
      this.#messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 3000,
      });
      this.loginForm.reset();
      this.formSubmitted.set(false);
    }
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }
}
