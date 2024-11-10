import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pokemon-info-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon-info-item.component.html',
  styleUrl: './pokemon-info-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-wrap flex-row justify-between items-center gap-4 md:justify-evenly'
  }
})
export class PokemonInfoItemComponent {
  public items = input.required<string[]>();
  public selected = input.required<string>();
  public updateSelected = output<string>();

  public changeOptionSelected(e: Event, item: string){
    e.preventDefault();
    this.updateSelected.emit(item);
  }
}
