import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignVisualizer } from './campaign-visualizer';

describe('CampaignVisualizer', () => {
  let component: CampaignVisualizer;
  let fixture: ComponentFixture<CampaignVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
