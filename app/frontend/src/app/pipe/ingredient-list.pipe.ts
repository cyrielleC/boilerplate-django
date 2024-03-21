import { Pipe, PipeTransform } from '@angular/core';
import { Food, FoodWithElements } from '../model/api-recipe.models';

@Pipe({
  name: 'ingredientList'
})
export class IngredientListPipe implements PipeTransform {

  transform(value: Food, join = ', '): string {
    return (value.elements ?? []).map((el) => (el.quantity > 1 ?  el.quantity : '') + (el.child.shortName ? el.child.shortName : el.child.name)).join(join);
  }
}
