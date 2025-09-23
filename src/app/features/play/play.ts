import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-play',
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule],
  templateUrl: './play.html',
  styleUrl: './play.css',
})
export class Play {
  #data = inject(DataService);
  campaigns = signal<any[]>([]);
  selectedCampaign = signal<any | null>(null);
  history = signal<any | null>(null);

  actionInput = '';

  ngOnInit() {
    this.#data.getActiveCampaigns().subscribe({
      next: (res) => this.campaigns.set(res),
    });
  }

  selectCampaign(campaignId: string) {
    this.#data.getHistory(campaignId).subscribe((res) => {
      this.history.set(res);
      this.selectedCampaign.set({
        id: res.campaign_id,
        name: res.campaign_name,
        mode: res.mode,
      });
    });
  }

  sendAction() {
    if (!this.selectedCampaign() || !this.actionInput.trim()) return;

    const campaignId = this.selectedCampaign().id;

    this.#data.doAction(campaignId, this.actionInput).subscribe(() => {
      // after action, reload history so chat + combat refresh
      this.#data.getHistory(campaignId).subscribe((res) => this.history.set(res));
    });

    this.actionInput = '';
  }

  // Convenience getter for turns
  turns() {
    return this.history()?.turns ?? [];
  }

  currentCombat() {
    const turns = this.turns();
    if (turns.length > 0) {
      return turns[turns.length - 1].combat_state; // last turn’s combat
    }
    return null;
  }

  currentLife() {
    const turns = this.turns();
    if (turns.length > 0) {
      return {
        player: turns[turns.length - 1].character_health,
        enemy: turns[turns.length - 1].enemy_health,
      }; // last turn’s life
    }
    return null;
  }
}
