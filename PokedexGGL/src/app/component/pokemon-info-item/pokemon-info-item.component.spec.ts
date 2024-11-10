import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInfoItemComponent } from './pokemon-info-item.component';

describe('PokemonInfoItemComponent', () => {
  let component: PokemonInfoItemComponent;
  let fixture: ComponentFixture<PokemonInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonInfoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
