import { ItemImagePipe } from './../../pokedex/pipes/item-image.pipe';
import { EvolutionDetail } from './../../pokedex/interfaces/api-pokedex-evolution-response.interface';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-evolution-details',
  standalone: true,
  imports: [
    CommonModule,
    ItemImagePipe
  ],
  templateUrl: './pokemon-evolution-details.component.html',
  styleUrl: './pokemon-evolution-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-center gap-1'
  }
})
export class PokemonEvolutionDetailsComponent {
  public detail = input.required<EvolutionDetail>();
}
