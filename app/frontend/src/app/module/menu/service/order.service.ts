import { Injectable } from '@angular/core';
import { Food, FoodType, Formula, FormulaType, MenuType } from '../../../model/recipe.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  menuNeedsChoice(choice: Formula, formulaChoice: FormulaType | null = null): boolean {
    if (choice.extras?.length > 0) {
      return true;
    }
    if (this.foodNeedsChoice(choice.food)) {
      return true;
    }
    if (choice.type !== MenuType.FORMULA) {
      return false;
    }
    switch(formulaChoice) {
      case FormulaType.price:
        return false;
      case FormulaType.allPrice:
        return this.foodNeedsChoice(choice.starter) || this.foodNeedsChoice(choice.dessert);
      case FormulaType.starterDishPrice:
        return this.foodNeedsChoice(choice.starter);
      case FormulaType.dishDessertPrice:
        return this.foodNeedsChoice(choice.dessert);
    }
    // TODO log
    throw new Error('Case should not happen');
  }

  foodNeedsChoice(food: Food): boolean {
    if (food.type === FoodType.CATEGORY) {
      return true;
    }
    for (let el of food.elements) {
      if (el.child.type === FoodType.CATEGORY) {
        return true;
      }
    }
    return false;
  }

  formulaHasStarter(formula: FormulaType): boolean {
    return true;
  }
}
