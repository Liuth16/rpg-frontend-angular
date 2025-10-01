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
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, ConfirmDialog],
  templateUrl: './play.html',
  styleUrl: './play.css',
})
export class Play implements OnInit, AfterViewChecked {
  #data = inject(DataService);
  #route = inject(ActivatedRoute);
  #confirmationService = inject(ConfirmationService);

  campaigns = signal<any[]>([]);
  selectedCampaign = signal<any | null>(null);
  history = signal<any | null>(null);

  actionInput = '';

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  private shouldScroll = false;

  ngOnInit() {
    this.#data.getActiveCampaigns().subscribe({
      next: (res) => {
        this.campaigns.set(res);
        const campaignId = this.#route.snapshot.queryParamMap.get('campaignId');
        if (campaignId) {
          this.selectCampaign(campaignId);
        }
      },
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

  confirmEndCampaign(campaignId: string) {
    this.#confirmationService.confirm({
      message: 'Are you sure you want to end this campaign?',
      header: 'Confirm End Campaign',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => this.endCampaign(campaignId),
    });
  }

  endCampaign(campaignId: string) {
    this.#data.endCampaign(campaignId).subscribe({
      next: () => {
        console.log(`Campaign ${campaignId} ended.`);
        this.campaigns.set(this.campaigns().filter((c) => c.id !== campaignId));

        if (this.selectedCampaign()?.id === campaignId) {
          this.selectedCampaign.set(null);
          this.history.set(null);
        }
      },
      error: (err) => {
        console.error('Failed to end campaign:', err);
      },
    });
  }

  sendAction() {
    if (!this.selectedCampaign() || !this.actionInput.trim()) return;

    const campaignId = this.selectedCampaign().id;

    this.#data.doAction(campaignId, this.actionInput).subscribe(() => {
      this.#data.getHistory(campaignId).subscribe((res) => {
        this.history.set(res);
        this.shouldScroll = true;
      });
    });

    this.actionInput = '';
  }

  useSuggestedAction(action: string) {
    this.actionInput = action;
  }

  turns() {
    return this.history()?.turns ?? [];
  }

  currentCombat() {
    const turns = this.turns();
    return turns.length > 0 ? turns[turns.length - 1].combat_state : null;
  }

  currentLife() {
    const turns = this.turns();
    return turns.length > 0
      ? {
          player: turns[turns.length - 1].character_health,
          enemy: turns[turns.length - 1].enemy_health,
        }
      : null;
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
