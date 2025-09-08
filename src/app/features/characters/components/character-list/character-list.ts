import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../../shared/profile-service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-list',
  imports: [AccordionModule, ButtonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  profileService = inject(ProfileService);
  characters = this.profileService.characters;
}
