import { Injectable } from '@angular/core';
import { CATEGORIES, Category, CategoryElement, Dish, DishElement, Food, FoodDishCategory, FoodElement, FoodIngredientCategory, FoodType, FormulaElement, FormulaExtraPrice, Ingredient, Restaurant } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { DishChoice } from '@app/model/local-recipe.models';
import { ChoiceModel } from '@app/model/local-recipe.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  restaurant: Restaurant | undefined;
  allDishElements: DishElement[];

  constructor(
    private readonly store: Store,
    ) {
    this.store.select(selectRestaurant)
      .subscribe((restaurant: Restaurant | undefined) => {
        this.restaurant = restaurant;
        this.allDishElements = this.restaurant!.categories.flatMap(
          (cat: Category) => cat.elements.flatMap((catEl: CategoryElement) => catEl.elements)
        );
      });
  }

  hasChoice(food: Food): boolean {
    if (this.isCategory(food.type)) {
      return true;
    }
    return !!food.elements?.some(el => this.isCategory(el.child.type));
  }

  getCategorieElements(categoryId: number): FoodElement<Dish | FoodDishCategory>[] | FoodElement<Ingredient | FoodIngredientCategory>[] {
    return this.restaurant?.foodcategories
      .find((category: FoodDishCategory) => categoryId === category.id)?.elements ?? [];
  }

  getFlattenCategorieElements(categoryId: number, quantity = 1): (FoodElement<Ingredient> | FoodElement<Dish>)[] {
    const elements = this.restaurant?.foodcategories.find((category: FoodDishCategory) => categoryId === category.id)?.elements ?? [];
    return elements.flatMap((element: FoodElement<any>) => {
      if (this.isCategory(element.child.type)) {
        return this.getFlattenCategorieElements(element.child.id, element.quantity);
      }
      return {
        ...element,
        quantity: element.quantity * quantity,
      };
    }) as FoodElement<Ingredient>[] | FoodElement<Dish>[];
  }

  calculateExtraPrice(extraPrices: FormulaExtraPrice, choice: DishChoice): number {
    if (!extraPrices || Object.keys(extraPrices).length === 0) {
      return 0;
    }

    return Object.values(choice)
      .flatMap(
        (el: ChoiceModel[][]) => {
          return el.flatMap((choices: ChoiceModel[]) => 
            choices.flatMap((choice: ChoiceModel) => [
              ...Object.values(choice.subChoice ?? {})
              .flatMap(
                (subEl: Ingredient[]) => subEl.map((ing: Ingredient) => this.getFoodExtraPrice(ing.id, extraPrices))
              ),
              this.getFoodExtraPrice(choice.choice?.id,extraPrices)
            ])
          )
        }
      )
      .reduce<number>((acc, nombre) => acc + nombre, 0);
  }

  getFoodExtraPrice(foodId: number, categoryExtraPrice: FormulaExtraPrice): number {
    return categoryExtraPrice[foodId] ?? 0;
  }

  getAssociatedDishElement(formulaEl: FormulaElement): DishElement {
    const dishElement = this.allDishElements.find((el: DishElement) => el.id === formulaEl.dishElementId);
    if (!dishElement) {
      throw new Error('shouldnt happen');
    }
    return dishElement;
  }

  isCategory(type: FoodType): boolean {
    return CATEGORIES.includes(type);
  }
}
