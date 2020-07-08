import { Component } from '@angular/core';
import { Pokemon } from 'src/utils/models';
import { PokemonService } from 'src/services/pokemon.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pokedex';

  pokemon = new Pokemon();
  namePokemon: string; 
  nameType: string;
  pokemonList = new Array();
  p: number = 1;
  choosePokemon = false;
  pokemonEmpty = false;
  pokemonListEmpty = true;

  constructor(private pkService: PokemonService) {
  }

  ngOnInit() {
    
  }

  searchPokemonByName() {
    this.namePokemon = this.namePokemon.toLowerCase();
    this.pokemon = this.pkService.searchPokemonByName(this.namePokemon);

    this.show(this.pokemon);
  }

  searchByType() {
    this.nameType = this.nameType.toLowerCase();
    this.pokemonList = this.pkService.searchByTypeName(this.nameType);
  }

  show(pokemon) {
    
    this.pokemon = pokemon;

    console.log(this.pokemon);
    this.choosePokemon = true;

  }

  clear() {
    this.pokemon = new Pokemon();
  }

  }
