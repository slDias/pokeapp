interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  caught: boolean;
  health: number;
  type: Array<string>; // todo enum
  weightGrams: number;
  heightCm: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  caughtDate?: Date;
  notes?: Array<Note>;
}

interface Note {
  content: string;
  createdDate: Date;
}
