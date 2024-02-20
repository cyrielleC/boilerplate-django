import { Pipe, PipeTransform } from '@angular/core';
import { BaseDish, DishSize, PriceSize } from '../model/recipe.models';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: BaseDish, prices: DishSize[]): string {
    if (value.price) {
      return this.getPriceWithEuro(value.price);
    }
    // TODO translation
    return value.prices?.map((el) => prices
      .find(price => price.id === el.size)?.name + ' ' + this.getPriceWithEuro(el.price))
      .join(' / ')
      ?? '';
  }

  private getPriceWithEuro(value: number): string {
    return value.toString() + ' €';
  }
}
