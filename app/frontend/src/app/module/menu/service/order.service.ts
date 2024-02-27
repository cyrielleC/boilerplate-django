import { Injectable } from '@angular/core';
import { Dish, Food, FoodCategory, FoodElement, FoodType, FoodWithElements, Ingredient } from '../../../model/recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurantCategories } from '../../../store/selector/recipe.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arraySizeValidator } from '../../../validaror/array-size.validator';

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
    return this.categories
      .find((category: FoodCategory) => categoryId === category.id)?.elements ?? [];
  }

  getIngredientFormGroupAndFilteredElementsForFood(food: Dish): [FormGroup, FoodElement<FoodCategory>[]] {
    const groupContent: { [key: number]: FormControl } = {};
    const elements = food.elements.filter((el) => el.child.type === FoodType.CATEGORY) as FoodElement<FoodCategory>[];
    elements.forEach((el) => {
        groupContent[el.child.id] = new FormControl(
          [], [Validators.required, arraySizeValidator(el.quantity, el.quantity)]);
      }
    );
    return [new FormGroup(groupContent, Validators.required), elements];
  }
}
