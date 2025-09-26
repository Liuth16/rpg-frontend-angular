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

  charForm: FormGroup = this.#fb.group({
    name: ['', Validators.required],
    race: ['', Validators.required],
    char_class: ['', Validators.required],
    description: [''],
    strength: [0, [Validators.required, Validators.min(1)]],
    dexterity: [0, [Validators.required, Validators.min(1)]],
    intelligence: [0, [Validators.required, Validators.min(1)]],
    charisma: [0, [Validators.required, Validators.min(1)]],
  });

  submit() {
    if (this.charForm.invalid) return;

    this.#data.createCharacter(this.charForm.value).subscribe({
      next: () => {
        alert('Character created successfully!');
        this.charForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create character.');
      },
    });
  }
}
