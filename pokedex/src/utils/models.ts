export class Pokemon {
    id: number;
    abilities: Ability[];
    name: string;
    img_url: string;
    types: Type[];
    height: string;
    weight: string;
}

export class Ability {
    name: string;
    url_database: string;
}

export class Type {
  name: string;
  url_database: string;
}