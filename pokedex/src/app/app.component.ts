import { Component } from '@angular/core';
import { Pokemon } from 'src/utils/models';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  pokemon = new Pokemon();
  namePokemon: string; 
  nameType: string;
  pokemonList = new Array();
  pagPokList: number = 1; // pokemon list
  pagAbiList: number = 1; // pokemon's abilities list
  choosePokemon = false;
  pokemonListEmpty = true;
  title: string;
  subtitle: string;

  constructor(private pkService: PokemonService) {
  }

  ngOnInit() {
    this.title = "WELCOME TO THE ANGULAR POKEDEX!";
    this.subtitle = "Search a pokemon!";
  }

  searchPokemonByName() {
    this.namePokemon = this.namePokemon.toLowerCase();

    this.pokemon = this.pkService.searchPokemonByName(this.namePokemon);

    if (this.pokemon.id) {
    this.show(this.pokemon);
    } else {
    this.choosePokemon = false;
    this.setErrorDisplay();
    }
  }

  searchByType() {
    this.pagPokList = 1;
    
    this.nameType = this.nameType.toLowerCase();
    this.pokemonList = this.pkService.searchByTypeName(this.nameType);
  }

  show(pokemon) {

    this.pokemon = pokemon;

    this.choosePokemon = true; 

    this.namePokemon = ''

  }

  clickPokemon(name) {

    this.namePokemon = name;

    this.choosePokemon = true;

    this.searchPokemonByName();
  }

  clear() {
    this.pokemon = new Pokemon();
    this.choosePokemon = false;
  }

  setErrorDisplay() {
    this.title = "Pokemon not found!"
    this.subtitle = "Try another name or type"
  }

  nextPage() {
    this.pagPokList++;

  }

  previousPage() {
    this.pagPokList--;
  }

  getTotalPages(): number {

    var pages: number;

    if ((this.pokemonList.length / 12) % 12 == 0) {
      pages = this.pokemonList.length / 12
    } else {
      pages = Math.round(this.pokemonList.length / 12)
    }

    return pages;
  }


  }
