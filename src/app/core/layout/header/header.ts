import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { DataService } from '../../../features/services/data.service';

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
  #data = inject(DataService);

  user = signal<any | null>(null);

  ngOnInit() {
    if (this.#auth.isLoggedIn()) {
      this.#data.getMe().subscribe({
        next: (res) => this.user.set(res),
        error: () => this.user.set(null),
      });
    }
  }

  items = computed<MenuItem[]>(() => {
    if (this.#auth.isLoggedIn()) {
      return [
        { label: 'Personagens', routerLink: '/characters' },
        { label: 'Histórico', routerLink: '/history' },
      ];
    } else {
      return [
        { label: 'Home', routerLink: '/' },
        { label: 'Login', routerLink: '/login' },
        { label: 'Registrar', routerLink: '/register' },
      ];
    }
  });

  logout() {
    this.#auth.logout();
  }
}
