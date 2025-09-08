import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { DataViewModule } from 'primeng/dataview';
import { Character } from '../../models/character.model';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-visualizer',
  imports: [DataViewModule, Listbox, FormsModule],
  templateUrl: './character-visualizer.html',
  styleUrl: './character-visualizer.css',
})
export class CharacterVisualizer {
  profileService = inject(ProfileService);

  selectCharacter(character: Character): void {
    this.profileService.selectCharacter(character);
  }
}
