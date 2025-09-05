import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CardModule } from 'primeng/card';

// THIS MAY BE MOVED TO A SEPARATE FILE LATER
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordsMismatch: true }
    : null;
}

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessageModule,
    ReactiveFormsModule,
    CardModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  #messageService = inject(MessageService);
  #fb = inject(FormBuilder);
  formSubmitted = signal(false);

  registerForm = this.#fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator }
  );

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.registerForm.valid) {
      this.#messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Registered successfully',
        life: 3000,
      });
      this.registerForm.reset();
      this.formSubmitted.set(false);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.invalid && (control.touched || this.formSubmitted()));
  }
}
