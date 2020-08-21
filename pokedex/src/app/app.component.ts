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
  choosePokemon = false;
  title: string;
  subtitle: string;
  indexPokemon: number;
  button_sfx = new Audio();
  success_sfx = new Audio();

  constructor(private pkService: PokemonService) {
  }

  ngOnInit() {
    this.title = "WELCOME TO THE ANGULAR POKEDEX!";
    this.subtitle = "Search a pokemon!";

    this.button_sfx.src = '/assets/sounds/button-sfx.mp3';
    this.button_sfx.setAttribute('crossorigin', 'anonymous');

    this.success_sfx.src = '/assets/sounds/success-sfx1.mp3';
    this.success_sfx.setAttribute('crossorigin', 'anonymous');
  }

  searchPokemonByName() {
    this.button_sfx.play();
    this.namePokemon = this.namePokemon.toLowerCase();

    this.pokemon = this.pkService.searchPokemonByName(this.namePokemon);

    this.show();
  }

  searchByType() {
    this.button_sfx.play();
    this.pagPokList = 1;
    
    this.nameType = this.nameType.toLowerCase();
    this.pokemonList = this.pkService.searchByTypeName(this.nameType);
  }

  show() {

    if (this.pokemon) {
      this.choosePokemon = true; 
      this.namePokemon = '';

      this.indexPokemon = this.pokemonList.findIndex(item => item == this.pokemon);
      console.log(this.pokemon);
       // find the index (not working yet)

      console.log(this.indexPokemon)

      } else {
      this.choosePokemon = false;
      this.setErrorDisplay();
      }

  }

  clickPokemon(name) {

    this.namePokemon = name;

    this.choosePokemon = true;

    this.searchPokemonByName();
  }

  clear() {
    this.success_sfx.play();
    this.pokemon = new Pokemon();
    this.choosePokemon = false;
    this.title = "Display Cleared!"
    this.subtitle = "Would you like to search another pokemon?"
  }

  setErrorDisplay() {
    this.title = "Pokemon not found!"
    this.subtitle = "Try another name or type"
  }

  nextPage() {
    this.pagPokList++;
    this.button_sfx.play();
  }

  previousPage() {
    this.pagPokList--;
    this.button_sfx.play();
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
