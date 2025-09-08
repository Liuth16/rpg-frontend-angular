import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { CharacterVisualizer } from './components/character-visualizer/character-visualizer';
import { CampaignVisualizer } from './components/campaign-visualizer/campaign-visualizer';

@Component({
  selector: 'app-profile',
  imports: [SplitterModule, CharacterVisualizer, CampaignVisualizer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
