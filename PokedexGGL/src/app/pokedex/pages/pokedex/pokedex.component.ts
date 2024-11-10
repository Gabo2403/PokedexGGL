import { Pokemon } from './../../interfaces/api-pokedex-response.interface';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../../../component/pokemon-card/pokemon-card.component';
import { PokedexService } from '../../services/pokedex.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export default class PokedexComponent implements OnInit{
  public pokedexService = inject(PokedexService);
  private router = inject(Router);
  ngOnInit(): void {

  }

  public nextPokedex(event: any): void{
    event.preventDefault();
    this.pokedexService.nextPokedex().subscribe()
  }

  public previousPokedex(event: any): void {
    event.preventDefault();
    this.pokedexService.previousPokedex().subscribe()
  }

  public handleClick(pokemon: string){
    this.router.navigate(['/pokedex', pokemon]);
  }
}