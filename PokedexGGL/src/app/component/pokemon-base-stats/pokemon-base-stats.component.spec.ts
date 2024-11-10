import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBaseStatsComponent } from './pokemon-base-stats.component';

describe('PokemonBaseStatsComponent', () => {
  let component: PokemonBaseStatsComponent;
  let fixture: ComponentFixture<PokemonBaseStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBaseStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBaseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
