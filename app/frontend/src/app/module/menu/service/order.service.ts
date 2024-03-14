import { Injectable } from '@angular/core';
import { Category, CategoryElement, Dish, DishElement, Food, FoodCategory, FoodElement, FoodType, FormulaElement, FormulaExtraPrice, Ingredient, Restaurant } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { ChoiceModel, DishChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';

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

    return Object.values(choice)
      .flatMap(
        (el: ChoiceModel[]) => {
          return el.flatMap((choice: ChoiceModel) => [
            ...Object.values(choice.subChoice ?? {})
            .flatMap(
              (subEl: Ingredient[]) => subEl.map((ing: Ingredient) => this.getFoodExtraPrice(ing.id, extraPrices))
            ),
            this.getFoodExtraPrice(choice.choice?.id,extraPrices)
          ])
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
}
