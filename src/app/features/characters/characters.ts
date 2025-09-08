import { Component } from '@angular/core';
import { CharacterList } from './components/character-list/character-list';

@Component({
  selector: 'app-characters',
  imports: [CharacterList],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {}
