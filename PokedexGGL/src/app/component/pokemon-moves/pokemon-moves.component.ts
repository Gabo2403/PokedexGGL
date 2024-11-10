import { PokemonMoveCardComponent } from './../pokemon-move-card/pokemon-move-card.component';
import { TitleCasePipe } from '@angular/common';
import { Move } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-moves',
  standalone: true,
  imports: [
    PokemonMoveCardComponent
  ],
  templateUrl: './pokemon-moves.component.html',
  styleUrl: './pokemon-moves.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row flex-wrap justify-start gap-3 items-center'
  }
})
export class PokemonMovesComponent {
  public moves = input.required<Move[]>();
}
