import { PokemonImagePipe } from './../../pokedex/pipes/pokemon-image.pipe';
import { PokemonTypesComponent } from './../pokemon-types/pokemon-types.component';
import { PokedexService } from './../../pokedex/services/pokedex.service';
import { PokemonInfo } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonTypesComponent, PokemonImagePipe],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './pokemon-card.component.css',
  host: {
    class: 'basis-[45%] md:basis-1/5 sm:basis-2/6'
  }
})
export class PokemonCardComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  private pokedexService = inject(PokedexService);
  public name = input.required<string>();
  public selected = output<string>();
  public pokemon = signal<PokemonInfo>({} as PokemonInfo);
  public bgColor = computed(() => this.pokemon().types ? `bg-${this.pokemon().types[0]?.type.name}` : 'bg-normal');
  public bgType = computed(() => this.pokemon().types ? `bg-${this.pokemon().types[0]?.type.name}-type` : 'bg-normal-type');
  public order = computed(() => this.pokemon().order ? this.pokemon().order.toString().padStart(3,'0') : '')
  ngOnInit(): void {
    this.loadPokemonData();
  }

  private loadPokemonData(): void{
    this.subs = this.pokedexService.getPokemonByIdOrName(this.name())
    .subscribe( info => {
      this.pokemon.set(info);
    })
  }

  public handleClick(){
    this.selected.emit(this.pokemon().name);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
