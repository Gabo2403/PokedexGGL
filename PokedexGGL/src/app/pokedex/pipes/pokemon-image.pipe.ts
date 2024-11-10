import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImage',
  standalone: true
})
export class PokemonImagePipe implements PipeTransform {

  transform(id: number): string {
    const url: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return url;
  }

}
