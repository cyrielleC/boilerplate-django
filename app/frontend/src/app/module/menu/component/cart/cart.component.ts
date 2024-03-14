import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChoiceModel, FormulaChoice } from '../choice-pop-up/choice-pop-up.component';
import { selectOrder } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';
import { DishElement, Food, FoodCategory, FoodElement, FormulaElement, FormulaExtraPrice, Ingredient } from '@app/model/api-recipe.models';
import { CategoryService } from '@menu/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  order$: Observable<FormulaChoice[]> = this.store.select(selectOrder);
  constructor(
    private readonly store: Store,
    private readonly orderService: CategoryService,
  ) {
  }

  getDishElement(formulaEl: FormulaElement): DishElement {
    return this.orderService.getAssociatedDishElement(formulaEl);
  }

  getFoodExtraPrice(foodId: number, categoryExtraPrice: FormulaExtraPrice): string {
    const price = this.orderService.getFoodExtraPrice(foodId, categoryExtraPrice);
    return price > 0 ? price.toString() : '';
  }

  getFoodElement(food: Food, foodId: string): FoodElement<FoodCategory> {
    return food.elements?.find(el => foodId === el.child.id.toString()) as FoodElement<FoodCategory>;
  }
}
