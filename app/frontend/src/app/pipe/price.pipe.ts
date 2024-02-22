import { Pipe, PipeTransform } from '@angular/core';
import { CategoryElement } from '../model/recipe.models';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: CategoryElement): string {
    return '15€';
  }

  private getPriceWithEuro(value: number): string {
    return value.toString() + ' €';
  }
}
