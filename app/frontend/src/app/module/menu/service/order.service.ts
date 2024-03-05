import { Injectable } from '@angular/core';
import { Dish, Food, FoodCategory, FoodElement, FoodType, FormulaExtraPrice, Ingredient, Restaurant } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { ChoiceModel, DishChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { IngredientChoiceValue } from '@menu/component/ingredient-choice/ingredient-choice.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  restaurant: Restaurant | undefined;

  constructor(
    private readonly store: Store,
    ) {
    this.store.select(selectRestaurant)
      .subscribe((restaurant: Restaurant | undefined) => {
        this.restaurant = restaurant;
      });
  }

  hasChoice(food: Food): boolean {
    if (food.type === FoodType.CATEGORY) {
      return true;
    }
    return !!food.elements?.some(el => el.child.type === FoodType.CATEGORY)
  }

  getCategorieElements(categoryId: number): FoodElement<Ingredient | Dish | FoodCategory>[] {
    return this.restaurant?.foodcategories
      .find((category: FoodCategory) => categoryId === category.id)?.elements ?? [];
  }

  getFlattenCategorieElements(categoryId: number, quantity = 1): FoodElement<Ingredient | Dish>[] {
    const elements = this.restaurant?.foodcategories.find((category: FoodCategory) => categoryId === category.id)?.elements ?? [];
    return elements.flatMap(element => {
      if (element.child.type === FoodType.CATEGORY) {
        return this.getFlattenCategorieElements(element.child.id, element.quantity);
      }
      return {
        ...element,
        quantity: element.quantity * quantity,
      };
    }) as FoodElement<Dish | Ingredient>[];
  }

  calculateExtraPrice(extraPrices: FormulaExtraPrice, choice: DishChoice): number {
    if (!extraPrices || Object.keys(extraPrices).length === 0) {
      return 0;
    }

    let finalPrice = 0;

    for (const [key, value] of Object.entries(choice)) {
      let arrayToMep;
      value.map((el: ChoiceModel)=> {
        arrayToMep = el as IngredientChoiceValue[];
        if (!(el instanceof Array)) {
          finalPrice = finalPrice + this.getFoodExtraPrice(el.choice.id,extraPrices);
          arrayToMep = (el.subChoice ? [el.subChoice] : []) as IngredientChoiceValue[];
        }
        arrayToMep.forEach((ingredientChoice: IngredientChoiceValue) => {
          finalPrice = Object.values(ingredientChoice)
                        .flatMap(
                          (ingredients: Ingredient[]) => {
                            return ingredients.map(
                              (ingredient: Ingredient) => 
                                this.getFoodExtraPrice(ingredient.id, extraPrices)
                            )
                          }).reduce<number>((acc, nombre) => acc + nombre, finalPrice);
        });
      });
    }
    return finalPrice;
  }

  getFoodExtraPrice(foodId: number, categoryExtraPrice: FormulaExtraPrice): number {
    return categoryExtraPrice[foodId] ?? 0;
  }
}
