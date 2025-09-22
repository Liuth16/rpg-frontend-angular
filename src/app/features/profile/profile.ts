import { Component, inject, signal } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { DataService } from '../services/data.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile',
  imports: [SplitterModule, CardModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  #data = inject(DataService);
  user = signal<any | null>(null);

  ngOnInit() {
    this.#data.getMe().subscribe({
      next: (res) => this.user.set(res),
      error: () => this.user.set(null),
    });
  }
}
