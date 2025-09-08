import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { CharacterVisualizer } from './components/character-visualizer/character-visualizer';
import { CampaignVisualizer } from './components/campaign-visualizer/campaign-visualizer';
import { CampaignHistoryVisualizer } from './components/campaign-history-visualizer/campaign-history-visualizer';

@Component({
  selector: 'app-profile',
  imports: [SplitterModule, CharacterVisualizer, CampaignVisualizer, CampaignHistoryVisualizer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
