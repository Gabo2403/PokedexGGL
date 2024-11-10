import { Type } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-types',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row flex-wrap gap-1 mt-1'
  }
})
export class PokemonTypesComponent {
  public types = input.required<Type[]>();
  public bgType = input.required<string>();
}
