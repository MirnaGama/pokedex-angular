import { Component } from '@angular/core';
import { Pokemon } from 'src/utils/models';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';

  pokemon = new Pokemon();
  name: string;

  constructor(private pkService: PokemonService) {
  }

  ngOnInit() {
    
  }

  pesquisar() {
    this.pokemon = this.pkService.searchByPokemonName(this.name);
    console.log(this.pokemon)
  }

  }
