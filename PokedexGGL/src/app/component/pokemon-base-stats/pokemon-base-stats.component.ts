import { CommonModule } from '@angular/common';
import { Stat } from './../../pokedex/interfaces/api-pokemon-reponse.interface';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-pokemon-base-stats',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon-base-stats.component.html',
  styleUrl: './pokemon-base-stats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonBaseStatsComponent {
  public stats = input.required<Stat[]>();
  public maxStat = signal<number>(255);
  public maxTotalStat = computed(() => this.maxStat() * 6);
  public total = computed(() => this.stats().map(s => s.base_stat).reduce((p, c) => p + c  ));
}
