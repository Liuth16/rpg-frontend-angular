import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataService } from '../../../services/data.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './create-character.html',
  styleUrls: ['./create-character.css'],
})
export class CreateCharacter {
  constructor(private ref: DynamicDialogRef) {}
  #fb = inject(FormBuilder);
  #data = inject(DataService);

  classes = ['Warrior', 'Archer', 'Mage'];

  // Default values
  private baseStats: Record<string, any> = {
    Warrior: { strength: 10, dexterity: 5, intelligence: 3, charisma: 4 },
    Archer: { strength: 5, dexterity: 10, intelligence: 3, charisma: 4 },
    Mage: { strength: 3, dexterity: 4, intelligence: 10, charisma: 5 },
  };

  charForm: FormGroup = this.#fb.group({
    name: ['', Validators.required],
    race: ['', Validators.required],
    char_class: ['', Validators.required],
    description: [''],
    strength: [{ value: 0, disabled: true }, [Validators.required]],
    dexterity: [{ value: 0, disabled: true }, [Validators.required]],
    intelligence: [{ value: 0, disabled: true }, [Validators.required]],
    charisma: [{ value: 0, disabled: true }, [Validators.required]],
  });

  ngOnInit() {
    // Listen for changes on char_class
    this.charForm.get('char_class')?.valueChanges.subscribe((cls) => {
      if (cls && this.baseStats[cls]) {
        const stats = this.baseStats[cls];
        this.charForm.patchValue(stats, { emitEvent: false });
      }
    });
  }

  submit() {
    if (this.charForm.invalid) return;

    // Re-enable disabled controls before sending
    const payload = {
      ...this.charForm.getRawValue(), // includes disabled values
    };

    this.#data.createCharacter(payload).subscribe({
      next: (res) => {
        this.ref.close(res);
      },
      error: (err) => {
        console.error('Failed to create character:', err);
      },
    });
  }
}
