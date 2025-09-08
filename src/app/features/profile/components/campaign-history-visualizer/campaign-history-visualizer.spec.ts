import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignHistoryVisualizer } from './campaign-history-visualizer';

describe('CampaignHistoryVisualizer', () => {
  let component: CampaignHistoryVisualizer;
  let fixture: ComponentFixture<CampaignHistoryVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignHistoryVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignHistoryVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
