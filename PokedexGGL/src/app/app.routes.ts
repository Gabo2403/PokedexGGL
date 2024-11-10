import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pokedex',
        loadComponent: () => import('../app/pokedex/pages/pokedex/pokedex.component')
      },
      {
        path: 'pokedex/:pokemon',
        loadComponent: () => import('../app/pokedex/pages/pokedex/pokedex.component')
      },
      {
        path: '',
        redirectTo: 'pokedex',
        pathMatch: 'full'
      }
];
