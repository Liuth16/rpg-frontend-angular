import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../services/data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign {
  #config = inject(DynamicDialogConfig);
  #ref = inject(DynamicDialogRef);
  #fb = inject(FormBuilder);
  #data = inject(DataService);

  charId = this.#config.data?.charId;

  campaignForm = this.#fb.group({
    campaign_name: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit() {
    if (this.campaignForm.invalid) return;

    const { campaign_name, description } = this.campaignForm.value;

    this.#data
      .createCampaign({
        character_id: this.charId,
        name: campaign_name!,
        description: description!,
        mode: 'free',
      })
      .subscribe({
        next: (res) => {
          console.log('Campaign created:', res);
          this.#ref.close(res);
        },
        error: (err) => {
          console.error('Failed to create campaign:', err);
        },
      });
  }
}
