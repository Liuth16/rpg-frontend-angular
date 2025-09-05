import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
];
