import { Pipe, PipeTransform } from '@angular/core';
import { Food, FoodType, FormulaExtraPrice } from '../model/recipe.models';
import { CategoryService } from '../module/menu/service/order.service';

@Pipe({
  name: 'foodName'
})
export class FoodNamePipe implements PipeTransform {

  constructor(
    private readonly menuService: CategoryService,
  ) {
  }

  transform(value: Food, extraPrices: FormulaExtraPrice = {}, join = ', '): string {
    if (value.type === FoodType.CATEGORY) {
      let elements = value.elements;
      if (!elements) {
        elements = this.menuService.getCategorieElements(value.id);
      }
      if (elements) {
        return elements.map((el) => 
          (el.quantity > 1 ?  el.quantity : '') 
          + (el.child.shortName ? el.child.shortName : el.child.name)
          + (extraPrices[el.child.id] ? ' (supplément: ' + extraPrices[el.child.id].toString() + '€)' : '')
        ).join(join);
      }
    }
    return value.shortName ? value.shortName : value.name;
  }

}
