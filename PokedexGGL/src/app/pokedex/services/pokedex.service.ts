import { MoveResponse } from './../interfaces/api-pokedex-move-response.interface';
import { Evolution } from './../interfaces/api-pokedex-evolution-response.interface';
import { About } from './../interfaces/api-pokemon-about-response.interface';
import { PokemonInfo } from './../interfaces/api-pokemon-reponse.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from './../environments/environments';
import { Pokemon, Pokedex } from './../interfaces/api-pokedex-response.interface';
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private http = inject(HttpClient);
  private apiUrl: string = `${environment.apiUrl}`;
  private pokedexResponse = signal<Pokedex>({} as Pokedex);
  public totalItems = computed(() => this.pokedexResponse().count);
  public nextItems = computed(() => this.pokedexResponse().next);
  public previousItems = computed(() => this.pokedexResponse().previous);
  public pokedex = computed(() => this.pokedexResponse().results);
  public favorites = signal<number[]>([]);

  constructor() {
    const url: string = `${this.apiUrl}/pokemon`;
    this.getFavorites();
    this.getPokedex(url).subscribe();
  }

  public getFavorites(): void {
    this.favorites.set([]);
    if (typeof window !== 'undefined' && localStorage.getItem('poke-favorites')) {
      this.favorites.set(JSON.parse(localStorage.getItem('poke-favorites')!));
    }
  }
  

  //public getFavorites(): void {
    //this.favorites.set([]);
    //if(localStorage.getItem('poke-favorites')){
      //this.favorites.set(JSON.parse(localStorage.getItem('poke-favorites')!));
    //}
  //}

  public addToFavorites(id: number): void {
    this.favorites.update( pokemons => !pokemons.includes(id) ? [...pokemons, id] : pokemons.filter(p => p !== id));
    localStorage.setItem('poke-favorites', JSON.stringify(this.favorites()));
  }

  public isFavorite(id: number): boolean{
    return this.favorites().includes(id) ? true : false;
  }

  private setPokedex(pokedex: Pokedex): boolean {
    this.pokedexResponse.set(pokedex);
    return true;
  }

  public getPokedex(url: string): Observable<boolean> {
    return this.http.get<Pokedex>(url)
      .pipe(
        map(response => this.setPokedex(response)),
        catchError( () => of(false))
      )
  }

  public nextPokedex() : Observable<boolean> {
    return this.getPokedex(this.nextItems());
  }

  public previousPokedex() : Observable<boolean> {
    return this.getPokedex(this.previousItems());
  }

  public getPokemonByIdOrName(query: string): Observable<PokemonInfo> {
    const url: string = `${this.apiUrl}/pokemon/${query}`;
    return this.http.get<PokemonInfo>(url);
  }

  public getPokemonAboutById(id: number): Observable<About> {
    const url: string = `${this.apiUrl}/pokemon-species/${id}`;
    return this.http.get<About>(url);
  }

  public getEvolutionChain(url: string): Observable<Evolution>{
    return this.http.get<Evolution>(url);
  }

  public getMoveInformation(url: string): Observable<MoveResponse>{
    return this.http.get<MoveResponse>(url);
  }
}
