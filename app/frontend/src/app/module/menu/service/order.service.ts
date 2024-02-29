import { Injectable } from '@angular/core';
import { CategoryElement, Dish, Food, FoodCategory, FoodElement, FoodType, Formula, FormulaExtraPrice, Ingredient, Restaurant } from '@app/model/recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { ChoiceModel, DishChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { IngredientChoiceValue } from '@menu/component/ingredient-choice/ingredient-choice.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  getCategorieElements(categoryId: number): FoodElement<Ingredient | Dish>[] {
    return this.restaurant?.foodcategories
      .find((category: FoodCategory) => categoryId === category.id)?.elements ?? [];
  }


  calculatePrice(formula: Formula, choice: DishChoice): number {
    const extraPrices = this.restaurant?.categories
      .flatMap(el => el.elements)
      .find(el => el.formulas.some(fomulaEl => fomulaEl.id === formula.id))
      ?.formulaExtraPrices;
    
    if (!extraPrices || extraPrices.length === 0) {
      return formula.price;
    }

    let finalPrice = formula.price;
    // let finalPrice = formula.elements.map((el) => {
    //   let dishElement = categoryElement.elements.find((dishElement) => dishElement.food.type !== FoodType.CATEGORY && dishElement.id === el.dishElementId);
    //   return this.getFoodExtraPrice(dishElement?.id, categoryElement.formulaExtraPrices) * el.quantity;
    // }).reduce<number>((acc, nombre) => acc + nombre, formula.price);

    for (const [key, value] of Object.entries(choice)) {
      let arrayToMep;
      value.map((el: ChoiceModel)=> {
        arrayToMep = el as IngredientChoiceValue[];
        if (!(el instanceof Array)) {
          finalPrice = finalPrice + this.getFoodExtraPrice(el.choice.id,extraPrices);
          arrayToMep = (el.subChoice ? [el.subChoice] : []) as IngredientChoiceValue[];
        }
        arrayToMep.forEach((ingredientChoice: IngredientChoiceValue) => {
          finalPrice = Object.entries(ingredientChoice)
                        .flatMap(
                          ([catId, ingredients]: [string, Ingredient[]]) => {
                            const catPrice = this.getFoodExtraPrice(parseInt(catId), extraPrices);
                            return ingredients.map(
                              (ingredient: Ingredient) => 
                                this.getFoodExtraPrice(ingredient.id, extraPrices) || catPrice
                            )
                          }).reduce<number>((acc, nombre) => acc + nombre, finalPrice);
        });
      });
    }
    return finalPrice;
  }

  getFoodExtraPrice(foodId: number | undefined, categoryExtraPrice: FormulaExtraPrice[]) {
    return categoryExtraPrice.find((el) => el.foodId === foodId)?.price ?? 0;
  }

}
