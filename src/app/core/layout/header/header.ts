import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  constructor(private router: Router) {}

  // In a real app, this would come from an authentication service.
  isLoggedIn = signal(true);

  items = computed<MenuItem[]>(() => {
    if (this.isLoggedIn()) {
      return [
        {
          label: 'Home',
          routerLink: '/',
        },
        {
          label: 'Characters',
          routerLink: '/characters',
        },
        {
          label: 'Campaigns',
          routerLink: '/campaigns',
        },
        {
          label: 'History',
          routerLink: '/history',
        },
        {
          label: 'Logout',
          command: () => this.logout(),
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
  logout(): void {
    this.isLoggedIn.set(false);
  }
}
