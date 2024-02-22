import { Injectable } from '@angular/core';
import { Dish, Food, FoodCategory, FoodElement, FoodType, Ingredient } from '../../../model/recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurantCategories } from '../../../store/selector/recipe.selector';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  categories: FoodCategory[] = [];

  constructor(private readonly store: Store) {
    this.store.select(selectRestaurantCategories)
      .subscribe((categories) => this.categories = categories ?? []);
  }

  hasChoice(food: Food): boolean {
    if (food.type === FoodType.CATEGORY) {
      return true;
    }
    return !!food.elements?.some(el => el.child.type === FoodType.CATEGORY)
  }

  getCategorieElements(categoryId: number): FoodElement<Ingredient | Dish>[] {
    return this.categories?.find((category) => categoryId === category.id)?.elements ?? [];
  }

  // getCategoryFormGroup()
}
