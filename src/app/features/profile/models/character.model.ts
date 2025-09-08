export interface Campaign {
  campaignId: number;
  campaignName: string;
  campaignDescription: string;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
}

export interface Character {
  charId: number;
  name: string;
  level: number;
  class: string;
  attributes: Attributes;
  currentCampaign: Campaign;
  pastCampaigns: Campaign[];
}
