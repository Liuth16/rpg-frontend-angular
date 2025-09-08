import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';
import { Profile } from './features/profile/profile';
import { Characters } from './features/characters/characters';

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
  { path: 'profile', component: Profile, title: 'Profile' },
  { path: 'characters', component: Characters, title: 'Characters' },
];
