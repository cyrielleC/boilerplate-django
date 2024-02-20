import { Pipe, PipeTransform } from '@angular/core';
import { Food, FoodType, Ingredient } from '../model/recipe.models';

@Pipe({
  name: 'foodName'
})
export class FoodNamePipe implements PipeTransform {

  transform(value: Food, join = ', '): string {
    return value.elements?.length > 0 ?
      value.elements.map((el) => (el.quantity > 1 ?  el.quantity : '') + (el.child.shortName ? el.child.shortName : el.child.name)).join(join)
      : (value.shortName ? value.shortName : value.name);
  }

}
