import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../services/data.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ConfirmDialog],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit, AfterViewChecked {
  #data = inject(DataService);
  #confirmationService = inject(ConfirmationService);

  campaigns = signal<any[]>([]);
  selectedCampaign = signal<any | null>(null);
  history = signal<any | null>(null);

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  private shouldScroll = false;

  ngOnInit() {
    this.#data.getPastCampaigns().subscribe({
      next: (res) => this.campaigns.set(res),
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.chatContainer) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  selectCampaign(campaignId: string) {
    this.#data.getHistory(campaignId).subscribe((res) => {
      this.history.set(res);
      this.selectedCampaign.set({
        id: res.campaign_id,
        name: res.campaign_name,
        mode: res.mode,
      });
      this.shouldScroll = true;
    });
  }

  confirmDelete(campaignId: string) {
    this.#confirmationService.confirm({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this campaign history? This cannot be undone.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'blz-button',
      rejectButtonStyleClass: 'blz-button',
      accept: () => {
        this.#data.deleteCampaignHistory(campaignId).subscribe({
          next: () => {
            this.campaigns.update((prev) => prev.filter((c) => c.id !== campaignId));
            if (this.selectedCampaign()?.campaign_id === campaignId) {
              this.selectedCampaign.set(null);
            }
          },
          error: (err) => console.error('Failed to delete campaign history:', err),
        });
      },
    });
  }

  turns() {
    return this.history()?.turns ?? [];
  }

  turnEffects(turn: any) {
    return (
      turn.effects?.map((eff: any) => {
        const target =
          eff.target === 'self' ? 'Player' : eff.target === 'enemy' ? 'Enemy' : eff.target;
        return `${eff.type} → ${target} (${eff.value ?? ''})`;
      }) ?? []
    );
  }

  turnRewards(turn: any) {
    const rewards: string[] = [];
    if (turn.enemy_defeated_reward) {
      if (turn.enemy_defeated_reward.gainedExperience) {
        rewards.push(`✨ Gained ${turn.enemy_defeated_reward.gainedExperience} XP`);
      }
      if (turn.enemy_defeated_reward.loot?.length > 0) {
        rewards.push(`💰 Loot: ${turn.enemy_defeated_reward.loot.join(', ')}`);
      }
    }
    return rewards;
  }

  private scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTo({
        top: this.chatContainer.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {
      console.error('Auto-scroll failed', err);
    }
  }
}
