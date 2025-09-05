import { Component, inject } from '@angular/core';
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
  messageService = inject(MessageService);

  loginForm: FormGroup;

  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
        life: 3000,
      });
      this.loginForm.reset();
      this.formSubmitted = false;
    }
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
