import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  #router = inject(Router);

  goToPlay() {
    this.#router.navigate(['/characters']);
  }
}
