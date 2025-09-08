import { Injectable, signal, computed } from '@angular/core';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // THIS IS A DUMMY SERVICE FOR PROFILE PROVIDER

  #characters = signal<Character[]>([]);
  #selectedCharacter = signal<Character | null>(null);

  public readonly characters = this.#characters.asReadonly();
  public readonly selectedCharacter = this.#selectedCharacter.asReadonly();
  public readonly pastCampaigns = computed(() => this.#selectedCharacter()?.pastCampaigns ?? []);

  constructor() {
    this.loadInitialCharacters();
  }

  public selectCharacter(character: Character): void {
    this.#selectedCharacter.set(character);
  }

  private loadInitialCharacters(): void {
    const initialProfile = this.getUserProfile();
    this.#characters.set(initialProfile.characters);
  }

  public addCharacter(newCharacter: Character): void {
    this.#characters.update((currentCharacters) => [...currentCharacters, newCharacter]);
    console.log('A new character was created.', this.#characters());
  }

  getUserProfile() {
    return {
      userId: 1,
      characters: [
        {
          charId: 1,
          name: 'Zerker',
          level: 10,
          class: 'Warrior',
          attributes: { strength: 18, dexterity: 14, intelligence: 10 },
          currentCampaign: {
            campaignId: 5,
            campaignName: 'The 12 jobs',
            campaignDescription: 'A quest to complete 12 heroic tasks.',
          },
          pastCampaigns: [
            {
              campaignId: 1,
              campaignName: 'Dragon slayer',
              campaignDescription: 'A quest to slay the mighty dragon.',
            },
            {
              campaignId: 2,
              campaignName: 'Rescue the princess',
              campaignDescription: 'A quest to rescue the princess from the evil warlock.',
            },
          ],
        },
        {
          charId: 2,
          name: 'Ferumbras',
          level: 8,
          class: 'Wizard',
          attributes: { strength: 8, dexterity: 12, intelligence: 20 },
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
        },
      ],
    };
  }
}
