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
  pokemonList = new Array();
  searchPokemon = false;
  searchPokemonList = false;

  constructor(private pkService: PokemonService) {
  }

  ngOnInit() {
    
  }

  searchPokemonByName() {
    this.searchPokemonList = false
    this.pokemon = this.pkService.searchPokemonByName(this.name);
    console.log(this.pokemon)
    this.searchPokemon = true;
  }

  searchByType() {
    this.searchPokemon = false
    this.pokemonList = this.pkService.searchByTypeName(this.name);
    this.searchPokemonList = true;
  }

  }
