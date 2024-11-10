import { MoveResponse, Name } from './../../pokedex/interfaces/api-pokedex-move-response.interface';
import { PokedexService } from './../../pokedex/services/pokedex.service';
import { TitleCasePipe } from '@angular/common';
import { Move } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-move-card',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './pokemon-move-card.component.html',
  styleUrl: './pokemon-move-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row gap-3 items-center p-3'
  }
})
export class PokemonMoveCardComponent implements OnDestroy {

  private pokedexService = inject(PokedexService);
  private subcriptor: Subscription = new Subscription();
  public move = input.required<Move>();
  public moveInfo = signal<MoveResponse>({} as MoveResponse);
  public moveLanguage = computed(() => this.moveInfo().names ? this.moveInfo().names.find(m => m.language.name === 'es' || m.language.name === 'en') : {} as Name);
  public moveEffect = effect(() => {
    this.subcriptor = this.pokedexService.getMoveInformation(this.move().move.url)
    .subscribe({
      next: (data) =>  {
        this.moveInfo.set(data);
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  });

  ngOnDestroy(): void {
    this.subcriptor?.unsubscribe();
  }
}
