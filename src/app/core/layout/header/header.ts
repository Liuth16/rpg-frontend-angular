import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  #auth = inject(AuthService);

  items = computed<MenuItem[]>(() => {
    if (this.#auth.isLoggedIn()) {
      return [
        {
          label: 'Home',
          routerLink: '/',
        },
        {
          label: 'Play',
          routerLink: '/play',
        },
        {
          label: 'Profile',
          routerLink: '/profile',
        },
        {
          label: 'Characters',
          routerLink: '/characters',
        },
        {
          label: 'History',
          routerLink: '/history',
        },
        {
          label: 'Logout',
          command: () => this.#auth.logout(),
        },
      ];
    } else {
      return [
        {
          label: 'Home',
          routerLink: '/',
        },
        {
          label: 'Login',
          routerLink: '/login',
        },
        {
          label: 'Register',
          routerLink: '/register',
        },
      ];
    }
  });
}
