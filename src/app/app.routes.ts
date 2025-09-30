import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';
import { Profile } from './features/profile/profile';
import { Characters } from './features/characters/characters';
import { History } from './features/history/history';
import { authGuard } from './core/auth/auth.guard';
import { Play } from './features/play/play';
import { CreateCharacter } from './features/characters/components/create-character/create-character';
import { CreateCampaign } from './features/components/create-campaign/create-campaign';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
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
  { path: 'profile', component: Profile, title: 'Profile', canActivate: [authGuard] },
  { path: 'characters', component: Characters, title: 'Characters', canActivate: [authGuard] },
  { path: 'play', component: Play, title: 'Play', canActivate: [authGuard] },
  { path: 'history', component: History, title: 'History', canActivate: [authGuard] },
];
