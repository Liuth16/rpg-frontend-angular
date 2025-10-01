import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api';

  getMe() {
    return this.#http.get(`${this.apiUrl}/auth/me`);
  }

  getCharacters() {
    return this.#http.get<any[]>(`${this.apiUrl}/personagem`);
  }

  getCharacter(charId: string) {
    return this.#http.get<any>(`${this.apiUrl}/personagem/${charId}`);
  }

  createCharacter(payload: {
    name: string;
    race: string;
    char_class: string;
    description: string;
    strength: number;
    dexterity: number;
    intelligence: number;
    charisma: number;
  }) {
    return this.#http.post(`${this.apiUrl}/personagem`, null, { params: payload });
  }

  deleteCharacter(charId: string) {
    return this.#http.delete<{ message: string }>(`${this.apiUrl}/personagem/${charId}`);
  }

  getCampaigns() {
    return this.#http.get(`${this.apiUrl}/campanha`);
  }

  getCampaign(campaignId: string) {
    return this.#http.get(`${this.apiUrl}/campanha/${campaignId}`);
  }

  createCampaign(payload: {
    character_id: string;
    name: string;
    description: string;
    mode?: 'free' | 'standard';
  }) {
    return this.#http.post(`${this.apiUrl}/campanha`, null, { params: payload });
  }

  getHistory(campaignId: string) {
    return this.#http.get<any>(`${this.apiUrl}/historico/${campaignId}`);
  }

  doAction(campaignId: string, action: string) {
    return this.#http.post<any>(`${this.apiUrl}/campanha/${campaignId}/acao`, null, {
      params: { action },
    });
  }

  endCampaign(campaignId: string) {
    return this.#http.delete(`${this.apiUrl}/campanha/${campaignId}`);
  }

  getActiveCampaigns() {
    return this.#http.get<any[]>(`${this.apiUrl}/personagem`).pipe(
      map((characters) =>
        characters
          .filter((c) => c.current_campaign)
          .map((c) => ({
            ...c.current_campaign,
            character: { id: c.id, name: c.name },
          }))
      )
    );
  }

  getPastCampaigns() {
    return this.#http.get<any[]>(`${this.apiUrl}/personagem`).pipe(
      map((characters) =>
        characters.flatMap((c) =>
          (c.past_campaigns || []).map((camp: any) => ({
            ...camp,
            character: { id: c.id, name: c.name },
          }))
        )
      )
    );
  }

  deleteCampaignHistory(campaignId: string) {
    return this.#http.delete(`${this.apiUrl}/historico/${campaignId}`);
  }
}
