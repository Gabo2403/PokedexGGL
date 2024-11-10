import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemImage',
  standalone: true
})
export class ItemImagePipe implements PipeTransform {

  transform(item: string): string {
    const url: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item}.png`;
    return url;
  }

}
