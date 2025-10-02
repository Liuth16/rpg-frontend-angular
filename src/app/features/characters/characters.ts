import { Component, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCharacter } from '../components/create-character/create-character';
import { Router } from '@angular/router';
import { CreateCampaign } from '../components/create-campaign/create-campaign';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-characters',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    SkeletonModule,
    ToastModule,
    AvatarModule,
    ConfirmDialog,
  ],
  providers: [DialogService, MessageService, ConfirmationService],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  #data = inject(DataService);
  #dialogService = inject(DialogService);
  #messageService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
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
        this.refreshCharacters();
        this.viewCharacter(charId);
        this.#messageService.add({
          severity: 'success',
          summary: 'Campaign Created',
          detail: `Campaign created successfully`,
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

  confirmDeleteCharacter(charId: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to delete this character?',
      header: 'Confirm Delete Character',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => this.deleteCharacter(charId),
    });
  }

  private deleteCharacter(charId: string) {
    this.#data.deleteCharacter(charId).subscribe({
      next: () => {
        console.log(`Character ${charId} deleted.`);
        this.characters.set(this.characters().filter((c) => c.id !== charId));

        if (this.selectedCharacter()?.id === charId) {
          this.selectedCharacter.set(null);
        }

        this.#messageService.add({
          severity: 'success',
          summary: 'Character Deleted',
          detail: 'Character removed successfully.',
          life: 2000,
        });
      },
      error: (err) => {
        console.error('Failed to delete character:', err);
        this.#messageService.add({
          severity: 'error',
          summary: 'Delete Failed',
          detail: 'Could not delete the character.',
          life: 3000,
        });
      },
    });
  }

  confirmEndCampaign(campaignId: string, charId: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to end this campaign?',
      header: 'Confirm End Campaign',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => this.endCampaign(campaignId, charId),
    });
  }

  private endCampaign(campaignId: string, charId: string) {
    this.#data.endCampaign(campaignId).subscribe({
      next: () => {
        this.#messageService.add({
          severity: 'success',
          summary: 'Campaign Ended',
          detail: 'The campaign was ended successfully.',
          life: 2000,
        });
        // ✅ Refresh both list + details
        this.refreshCharacters();
        this.viewCharacter(charId);
      },
      error: (err) => {
        console.error('Failed to end campaign:', err);
        this.#messageService.add({
          severity: 'error',
          summary: 'Failed to End Campaign',
          detail: 'Could not end the campaign.',
          life: 3000,
        });
      },
    });
  }
}
