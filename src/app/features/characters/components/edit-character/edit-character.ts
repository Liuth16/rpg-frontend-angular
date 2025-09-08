import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../../shared/profile-service';
import { Character } from '../../../profile/models/character.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.html',
  imports: [ReactiveFormsModule, InputNumberModule, ButtonModule],
})
export class EditCharacter implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  protected character: Character | null = null;
  protected characterForm!: FormGroup;

  mockCharacter = {
    charId: 2,
    name: 'Ferumbras',
    level: 8,
    class: 'Wizard',
    attributes: {
      strength: 8,
      dexterity: 12,
      intelligence: 20,
    },
    currentCampaign: {
      campaignId: 6,
      campaignName: 'Traveling to OZ',
      campaignDescription: 'A magical journey to the land of OZ.',
    },
    pastCampaigns: [
      {
        campaignId: 3,
        campaignName: 'Wizard school',
        campaignDescription: 'A journey through the arcane arts.',
      },
      {
        campaignId: 4,
        campaignName: 'Discovering powers',
        campaignDescription: 'A journey of self-discovery and mastering new abilities.',
      },
    ],
  };

  ngOnInit(): void {
    this.profileService.selectCharacter(this.mockCharacter);
    this.character = this.profileService.selectedCharacter() ?? null;

    this.characterForm = this.fb.group({
      strength: [this.character?.attributes.strength ?? 0],
      dexterity: [this.character?.attributes.dexterity ?? 0],
      intelligence: [this.character?.attributes.intelligence ?? 0],
    });
  }

  save(): void {
    if (this.characterForm.valid && this.character) {
      const updatedAttributes = this.characterForm.value;
      const updatedCharacter: Character = {
        ...this.character,
        attributes: {
          ...this.character.attributes,
          ...updatedAttributes,
        },
      };

      this.profileService.updateCharacter(updatedCharacter);
      console.log('Character saved:', updatedCharacter);
    }
  }
}
