import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { ProfileService } from '../../../../shared/profile-service';
import { Character } from '../../../profile/models/character.model';
import { Attributes } from '../../../profile/models/character.model';

@Component({
  selector: 'app-edit-character',
  imports: [],
  templateUrl: './edit-character.html',
  styleUrl: './edit-character.css',
})
export class EditCharacter {
  @Input({ required: true }) character!: Character;

  // Outputs to communicate back to the parent component.
  @Output() save = new EventEmitter<Character>();
  @Output() cancel = new EventEmitter<void>();

  // Local signals to manage the editable state without modifying the original object directly.
  skillPoints = signal(0);
  attributes = {
    strength: signal(0),
    dexterity: signal(0),
    intelligence: signal(0),
  };

  // Store the original attributes to prevent decreasing them below their starting values.
  private originalAttributes!: Character['attributes'];

  // This lifecycle hook runs once when the component is initialized.
  ngOnInit(): void {
    if (this.character) {
      // Initialize the signals and original values from the input character.
      this.originalAttributes = { ...this.character.attributes };
      this.skillPoints.set(this.character.skillPoints ?? 0);
      this.attributes.strength.set(this.character.attributes.strength);
      this.attributes.dexterity.set(this.character.attributes.dexterity);
      this.attributes.intelligence.set(this.character.attributes.intelligence);
    }
  }

  // Method to increase an attribute
  increaseAttribute(attr: keyof typeof this.attributes): void {
    // Only allow increasing if there are skill points available.
    if (this.skillPoints() > 0) {
      this.skillPoints.update((sp) => sp - 1);
      this.attributes[attr].update((val) => val + 1);
    }
  }

  // Method to decrease an attribute
  decreaseAttribute(attr: keyof typeof this.attributes): void {
    // Only allow decreasing if the current value is greater than the original.
    if (this.attributes[attr]() > this.originalAttributes[attr]) {
      this.skillPoints.update((sp) => sp + 1);
      this.attributes[attr].update((val) => val - 1);
    }
  }

  onSave(): void {
    // Create a new character object with the updated values and emit it.
    const updatedCharacter: Character = {
      ...this.character,
      skillPoints: this.skillPoints(),
      attributes: {
        strength: this.attributes.strength(),
        dexterity: this.attributes.dexterity(),
        intelligence: this.attributes.intelligence(),
      },
    };
    this.save.emit(updatedCharacter);
  }

  onCancel(): void {
    // Emit the cancel event.
    this.cancel.emit();
  }
}
