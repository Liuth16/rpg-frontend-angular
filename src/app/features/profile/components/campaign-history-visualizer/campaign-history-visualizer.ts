import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-campaign-history-visualizer',
  imports: [ButtonModule, CardModule, DataViewModule],
  templateUrl: './campaign-history-visualizer.html',
  styleUrl: './campaign-history-visualizer.css',
})
export class CampaignHistoryVisualizer {
  profileService = inject(ProfileService);
}
