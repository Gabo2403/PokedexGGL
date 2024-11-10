import { Ability } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { About } from './../../pokedex/interfaces/api-pokemon-about-response.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokedexService } from './../../pokedex/services/pokedex.service';
import { Component, inject, input, signal, effect, computed, OnDestroy, output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-info-about',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './pokemon-info-about.component.html',
  styleUrl: './pokemon-info-about.component.css'
})
export class PokemonInfoAboutComponent implements OnDestroy {

  private pokedexService = inject(PokedexService);
  private subscription: Subscription = new Subscription();
  public id = input.required<number>();
  public height = input.required<number>();
  public weight = input.required<number>();
  public abilities = input.required<Ability[]>();
  public evolutionRoute = output<string>();
  public heightCm = computed(() => this.height() * 10);
  public weightKg = computed(() => this.weight() / 10);
  public abilitiesJoin = computed(() => (this.abilities().map(a => a.ability?.name)).join(', '));
  public about = signal<About>({} as About);
  public texts = computed(() => this.about().flavor_text_entries?.filter(f => f.language?.name === 'es'));
  public species = computed(() => this.about().genera?.find(a => a.language.name === 'en'));
  public female = computed(() => this.about().gender_rate >= 0 ? (this.about().gender_rate * 100) / 8 : 0);
  public male = computed(() => 100 - this.female());
  public eggGroups = computed(() => this.about().egg_groups.find((v, index) => index === 0));
  public eggCycle = computed(() => this.about().egg_groups.find((v, index) => index === 1));
  public idEffect = effect(() => {
    this.subscription = this.pokedexService.getPokemonAboutById(this.id())
    .subscribe({
      next: (data) =>  {
        this.about.set(data);
        this.evolutionRoute.emit(this.about().evolution_chain?.url);
        console.log(this.about());
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  });

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
