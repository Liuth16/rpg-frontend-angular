import { Component } from '@angular/core';
import { CharacterList } from './components/character-list/character-list';
import { EditCharacter } from './components/edit-character/edit-character';

@Component({
  selector: 'app-characters',
  imports: [CharacterList, EditCharacter],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {}
