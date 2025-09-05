import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
];
