import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInfoAboutComponent } from './pokemon-info-about.component';

describe('PokemonInfoAboutComponent', () => {
  let component: PokemonInfoAboutComponent;
  let fixture: ComponentFixture<PokemonInfoAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonInfoAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonInfoAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
