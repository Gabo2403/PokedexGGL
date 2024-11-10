import { PokemonMovesComponent } from '../../../component/pokemon-moves/pokemon-moves.component';
import { PokemonImagePipe } from './../../pipes/pokemon-image.pipe';
import { PokemonEvolutionComponent } from '../../../component/pokemon-evolution/pokemon-evolution.component';
import { PokemonBaseStatsComponent } from '../../../component/pokemon-base-stats/pokemon-base-stats.component';
import { PokemonInfoAboutComponent } from '../../../component/pokemon-info-about/pokemon-info-about.component';
import { CommonModule } from '@angular/common';
import { PokemonTypesComponent } from '../../../component/pokemon-types/pokemon-types.component';
import { PokedexService } from '../../services/pokedex.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { PokemonInfoItemComponent } from "../../../component/pokemon-info-item/pokemon-info-item.component";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonImagePipe,
    PokemonTypesComponent,
    PokemonInfoItemComponent,
    PokemonInfoAboutComponent,
    PokemonBaseStatsComponent,
    PokemonEvolutionComponent,
    PokemonMovesComponent
],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonComponent {

  private pokedexService = inject(PokedexService);
  private route = inject(ActivatedRoute);
  public pokemonName = signal<string>('');
  public pokemon = toSignal(
    this.route.params
    .pipe(
      switchMap(({ pokemon }) => this.pokedexService.getPokemonByIdOrName(pokemon))
    )
  );
  public bgType = computed(() => this.pokemon()?.types ? `bg-${this.pokemon()?.types[0]?.type.name}-type` : 'bg-normal-type');
  public bgColor = computed(() => this.pokemon()?.types ? `bg-${this.pokemon()?.types[0]?.type.name}` : 'bg-normal');
  public order = computed(() => this.pokemon()?.order ? this.pokemon()?.order.toString().padStart(3,'0') : '');
  public isFavorite = computed(() => this.pokemon() ? this.pokedexService.isFavorite(this.pokemon()!.id) : false);
  public infoItems = signal<string[]>(['About', 'Base Stats', 'Evolution', 'Moves']);
  public infoSelected = signal<string>(this.infoItems()[0]);
  public evolutionRoute = signal<string>('');

  public updateStorage(event: Event): void {
    event.preventDefault();
    console.log('pokemon',this.pokemon());
    this.pokedexService.addToFavorites(this.pokemon()!.id);
  }

  public updateSelected(item: string){
    console.log(item);
    this.infoSelected.set(item);
  }

  public setEvolutionRoute(url: string){
    this.evolutionRoute.set(url);
  }
}
