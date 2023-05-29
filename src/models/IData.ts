export interface ItemData extends ItemDataNoId {
  id: number;
}

export interface ItemDataNoId  {
  description: string;
  quantity: number;
  unity: string;
  category: string;
  place: string; 
  addedAt: string;
}

export enum Category {
  meat = 'meat',
  drink = 'drink',
} 

export enum Place {
  kitchen = 'kitchen',
  cleaning = 'cleaning',
} 