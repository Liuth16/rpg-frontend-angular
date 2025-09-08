import { Component, signal, inject } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-campaign-visualizer',
  imports: [DataViewModule],
  templateUrl: './campaign-visualizer.html',
  styleUrl: './campaign-visualizer.css',
})
export class CampaignVisualizer {
  profileService = inject(ProfileService);
}
