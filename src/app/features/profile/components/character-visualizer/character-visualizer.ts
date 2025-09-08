import { Component, inject, signal } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { DataViewModule } from 'primeng/dataview';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-visualizer',
  imports: [DataViewModule],
  templateUrl: './character-visualizer.html',
  styleUrl: './character-visualizer.css',
})
export class CharacterVisualizer {
  profileService = inject(ProfileService);

  selectCharacter(character: Character): void {
    this.profileService.selectCharacter(character);
  }
}
