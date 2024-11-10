import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveCardComponent } from './pokemon-move-card.component';

describe('PokemonMoveCardComponent', () => {
  let component: PokemonMoveCardComponent;
  let fixture: ComponentFixture<PokemonMoveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMoveCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMoveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
