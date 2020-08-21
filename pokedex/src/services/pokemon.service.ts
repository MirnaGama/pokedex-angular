import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/utils/models';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  requestUrl = 'https://pokeapi.co/api/v2/';
  pokemonUrl = this.requestUrl +'pokemon/';
  typeUrl = this.requestUrl + 'type/';

  constructor(private http: HttpClient) {
   }

   searchPokemonByName(name): any {
    let pokemonRequest = this.http.get<any>(this.pokemonUrl + name);
    var pok = new Pokemon();
    
    pokemonRequest.subscribe((data) => {
      pok['id'] = data['id'];
      pok['name'] = data['name'];
      pok['img_back_url'] = data['sprites']['back_default'];
      pok['img_front_url'] = data['sprites']['front_default'];
      pok['height'] = data['height'];
      pok['weight'] = data['weight'];

      var abilities = new Array();

      data['abilities'].forEach(element => { 
        abilities.push(element['ability'])
        });

      pok['abilities'] = abilities;

      pok['abilities'].forEach(element => {
        this.http.get<any>(element['url']).subscribe((data) => {

          data['flavor_text_entries'].forEach(description => {
            if (description['language']['name'] == 'en') {
              element['description'] = description['flavor_text'];
            }
          });
        })

      })

      var types = new Array();

      data['types'].forEach(element => {
        types.push(element['type'])
      });

      pok['types'] = types;


    }, (error) => {
       console.log("POKEMON NOT FOUND")
       return null; })

    return pok;
  }

  searchByTypeName(name): any {
    let typeRequest = this.http.get<any>(this.typeUrl+name);
    let pokemonList = new Array();

    typeRequest.subscribe((data) => {

      data['pokemon'].forEach(element => {

       let pokemon = new Pokemon();
        pokemon.name = element['pokemon']['name']

        pokemonList.push(pokemon);
      })

    }, 
    
    (error) => {
      console.log("POKEMON LIST NOT FOUND") 
      return null;
  })

    pokemonList.sort((a, b) => a.name.localeCompare(b.name)); // ORDER BY NAME ASC (NOT WORKING YET)
    return pokemonList;
  }

}
