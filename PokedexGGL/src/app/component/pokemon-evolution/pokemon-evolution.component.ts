import { PokemonEvolutionDetailsComponent } from './../pokemon-evolution-details/pokemon-evolution-details.component';
import { ItemImagePipe } from './../../pokedex/pipes/item-image.pipe';
import { PokemonImagePipe } from './../../pokedex/pipes/pokemon-image.pipe';
import { Subscription } from 'rxjs';
import { Evolution } from './../../pokedex/interfaces/api-pokedex-evolution-response.interface';
import { PokedexService } from './../../pokedex/services/pokedex.service';
import { Component, input, effect, inject, signal, OnDestroy, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-evolution',
  standalone: true,
  imports: [
    CommonModule,
    PokemonImagePipe,
    ItemImagePipe,
    PokemonEvolutionDetailsComponent
  ],
  templateUrl: './pokemon-evolution.component.html',
  styleUrl: './pokemon-evolution.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonEvolutionComponent implements OnDestroy{

  private pokedexService = inject(PokedexService);
  public subscription: Subscription = new Subscription();
  public evolutionUrl = input.required<string>();
  public evolutionChain = signal<Evolution>({} as Evolution);
  public firstEvolution = computed(() => {
    const url: string = this.evolutionChain().chain?.species?.url ?? '';
    return this.extractPokemonSpecieId(url);
  });
  public firstEvolutionName= computed(() => this.evolutionChain().chain?.species?.name);
  public evolvesTo = computed(() => this.evolutionChain().chain?.evolves_to);

  public evolutionEffect = effect(() => {
    this.subscription = this.pokedexService.getEvolutionChain(this.evolutionUrl())
    .subscribe({
      next: (data) =>  {
        this.evolutionChain.set(data);
        console.log(this.evolutionChain());
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  });

  public extractPokemonSpecieId(url: string): number {
    let idx = url.indexOf('pokemon-species');
    let extract = url.substring(idx, url.length - 1);
    const parts = extract.split('/');
    return Number(parts[1]);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
