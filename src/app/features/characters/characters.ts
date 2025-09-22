import { Component, inject, signal } from '@angular/core';
import { CharacterList } from './components/character-list/character-list';
import { EditCharacter } from './components/edit-character/edit-character';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, CardModule, ButtonModule],
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
  }
}
