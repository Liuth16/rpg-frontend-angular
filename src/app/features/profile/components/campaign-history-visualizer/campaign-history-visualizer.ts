import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-campaign-history-visualizer',
  imports: [],
  templateUrl: './campaign-history-visualizer.html',
  styleUrl: './campaign-history-visualizer.css',
})
export class CampaignHistoryVisualizer {
  profileService = inject(ProfileService);
}
