import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterVisualizer } from './character-visualizer';

describe('CharacterVisualizer', () => {
  let component: CharacterVisualizer;
  let fixture: ComponentFixture<CharacterVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
