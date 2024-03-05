import { Component, Input } from '@angular/core';
import { Food, FoodType, FormulaExtraPrice } from '@app/model/api-recipe.models';
import { CategoryService } from '@menu/service/order.service';

@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrl: './choice-list.component.scss'
})
export class ChoiceListComponent {
  @Input() textToReplace: string = '{{FOODS}}';
  @Input({ required: true }) element!: Food;
  @Input({ required: true }) extraPrices!: FormulaExtraPrice;

  constructor(
    private readonly menuService: CategoryService,
  ) {
  }
  
  getTranslationKey(value: Food): string {
    if (value.type === FoodType.CATEGORY) {
      let elements = value.elements;
      if (!elements) {
        elements = this.menuService.getCategorieElements(value.id);
      }
      if (elements) {
        return elements.map((el, index) => 
          (el.quantity > 1 ?  el.quantity : '') 
          + (el.child.shortName ? el.child.shortName : el.child.name)
          + this.getExtraPriceIfApplicable(el.child)
        ).join('ING_JOIN');
      }
    }
    return (value.shortName ? value.shortName : value.name) + this.getExtraPriceIfApplicable(value);
  }

  getExtraPriceIfApplicable(food: Food) {
    return this.extraPrices[food.id] ? 'BEFORE_SUPP_PRICE' + this.extraPrices[food.id].toString() + 'AFTER_SUPP_PRICE' : '';
  }
}
