import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormulaChoice } from '@app/model/local-recipe.models';
import { selectOrder } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';
import { DishElement, Food, FoodDishCategory, FoodElement, FormulaElement, FormulaExtraPrice } from '@app/model/api-recipe.models';
import { OrderService } from '@menu/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  order$: Observable<FormulaChoice[]> = this.store.select(selectOrder);
  constructor(
    private readonly store: Store,
    private readonly orderService: OrderService,
  ) {
  }

  getDishElement(formulaEl: FormulaElement): DishElement {
    return this.orderService.getAssociatedDishElement(formulaEl);
  }

  getFoodExtraPrice(foodId: number, categoryExtraPrice: FormulaExtraPrice): string {
    const price = this.orderService.getFoodExtraPrice(foodId, categoryExtraPrice);
    return price > 0 ? price.toString() : '';
  }

  getFoodElement(food: Food, foodId: string): FoodElement<FoodDishCategory> {
    return food.elements?.find(el => foodId === el.child.id.toString()) as FoodElement<FoodDishCategory>;
  }
}
