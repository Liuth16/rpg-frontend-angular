import { Component, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateCharacter } from './components/create-character/create-character';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, CardModule, ButtonModule, SkeletonModule],
  providers: [DialogService],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  #data = inject(DataService);
  #dialogService = inject(DialogService);
  dialogRef: DynamicDialogRef | undefined;
  #router = inject(Router);

  characters = signal<any[]>([]);
  selectedCharacter = signal<any | null>(null);

  ngOnInit() {
    this.#data.getCharacters().subscribe({
      next: (res) => this.characters.set(res),
    });
  }

  viewCharacter(charId: string) {
    this.#data.getCharacter(charId).subscribe({
      next: (res) => this.selectedCharacter.set(res),
    });
    console.log(this.characters());
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

    // optional: subscribe to close
    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        // refresh list or show a toast
        console.log('Character created:', result);
      }
    });
  }

  goToPlay(campaignId: string) {
    this.#router.navigate(['/play'], {
      queryParams: { campaignId },
    });
  }
}
