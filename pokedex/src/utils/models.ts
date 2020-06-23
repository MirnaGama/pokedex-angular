export class Pokemon {
    id: number;
    abilities: Ability[];
    name: string;
    img_back_url: string;
    img_front_url: string;
    types: Type[];
    height: string;
    weight: string;
}

export class Ability {
    name: string;
    url: string;
    description: string;
}

export class Type {
  name: string;
  url: string;
}