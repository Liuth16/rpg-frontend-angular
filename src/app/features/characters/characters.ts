import { Component, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Splitter } from 'primeng/splitter';
import { ScrollPanelModule, ScrollPanel } from 'primeng/scrollpanel';
@Component({
  selector: 'app-characters',
  imports: [CommonModule, CardModule, ButtonModule, SkeletonModule, Splitter, ScrollPanel],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  #data = inject(DataService);

  characters = signal<any[]>([]);
  selectedCharacter = signal<any | null>(null);

  ngOnInit() {
    this.#data.getCharacters().subscribe({
      next: (res) => this.characters.set(res),
    });
  }

  viewCharacter(charId: string) {
    this.#data.getCharacter(charId).subscribe({
      next: (res) => this.selectedCharacter.set(res),
    });
    console.log(this.characters());
  }
}
