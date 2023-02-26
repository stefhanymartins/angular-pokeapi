import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonData } from '../../models/pokemonData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  pokemon: PokemonData;
  search?: string = '';

  isInputValueEmpty: boolean = true;
  isClicked: boolean = false;
  pokemonFound: boolean = true;

  constructor(private service: PokemonService) {
    this.pokemon = {
      id: 0,
      name: '',
      sprites: {
        front_default: '',
      },
      types: [],
    };
  }

  ngOnInit(): void {
    this.getPokemon('pikachu');
  }

  onInputValueChange() {
    this.isInputValueEmpty = this.search?.length === 0;
  }

  onButtonClick() {
    this.isClicked = true;
    this.search = '';
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe({
      next: (res) => {
        this.pokemon = {
          id: res.id,
          name: res.name,
          sprites: res.sprites,
          types: res.types,
        };
        this.pokemonFound = true;
      },
      error: (err) => {
        console.log('Not Found');
        this.pokemonFound = false;
      },
    });
  }
}
