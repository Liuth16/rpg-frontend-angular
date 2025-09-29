import { Component, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCharacter } from './components/create-character/create-character';
import { Router } from '@angular/router';
import { CreateCampaign } from '../components/create-campaign/create-campaign';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, CardModule, ButtonModule, SkeletonModule, ToastModule, AvatarModule],
  providers: [DialogService, MessageService],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  #data = inject(DataService);
  #dialogService = inject(DialogService);
  #messageService = inject(MessageService);
  dialogRef: DynamicDialogRef | undefined;
  #router = inject(Router);

  characters = signal<any[]>([]);
  selectedCharacter = signal<any | null>(null);

  ngOnInit() {
    this.refreshCharacters();
  }

  refreshCharacters() {
    this.#data.getCharacters().subscribe({
      next: (res) => this.characters.set(res),
    });
  }

  viewCharacter(charId: string) {
    this.#data.getCharacter(charId).subscribe({
      next: (res) => this.selectedCharacter.set(res),
    });
  }

  openCreateDialog() {
    this.dialogRef = this.#dialogService.open(CreateCharacter, {
      width: 'fit-content',
      closable: true,
      showHeader: true,
      modal: true,
      style: { background: 'transparent', border: 'none', boxShadow: 'none' },
      breakpoints: {
        '960px': '75vw',
        '640px': '95vw',
      },
    });

    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.refreshCharacters();
        this.#messageService.add({
          severity: 'success',
          summary: 'Character Created',
          detail: `${result.name} was created successfully`,
          life: 2000,
        });
      }
    });
  }

  openCreateCampaignDialog(charId: string) {
    this.dialogRef = this.#dialogService.open(CreateCampaign, {
      closable: true,
      showHeader: true,
      modal: true,
      data: { charId },
      style: { background: 'transparent', border: 'none', boxShadow: 'none' },
      width: '40vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '95vw',
      },
    });

    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.viewCharacter(charId);
        this.#messageService.add({
          severity: 'success',
          summary: 'Campaign Created',
          detail: `${result.name} started successfully`,
          life: 2000,
        });
      }
    });
  }

  goToPlay(campaignId: string) {
    this.#router.navigate(['/play'], {
      queryParams: { campaignId },
    });
  }
}
