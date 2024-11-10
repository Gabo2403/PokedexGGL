import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionDetailsComponent } from './pokemon-evolution-details.component';

describe('PokemonEvolutionDetailsComponent', () => {
  let component: PokemonEvolutionDetailsComponent;
  let fixture: ComponentFixture<PokemonEvolutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonEvolutionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonEvolutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
