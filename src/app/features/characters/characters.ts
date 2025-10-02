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
          summary: 'Personagem Criado',
          detail: `${result.name} foi criado com sucesso`,
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
          summary: 'Campanha Criada',
          detail: `Campanha criada com sucesso`,
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
      message: 'Tem certeza que deseja deletar este personagem?',
      header: 'Confirmar Deletar Personagem',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
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
          summary: 'Personagem excluído',
          detail: 'Personagem removido com sucesso.',
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
      message: 'Tem certeza que deseja encerrar esta campanha?',
      header: 'Confirmar Encerrar Campanha',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.endCampaign(campaignId, charId),
    });
  }

  private endCampaign(campaignId: string, charId: string) {
    this.#data.endCampaign(campaignId).subscribe({
      next: () => {
        this.#messageService.add({
          severity: 'success',
          summary: 'Campanha Encerrada',
          detail: 'Campanha encerrada com sucesso.',
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
