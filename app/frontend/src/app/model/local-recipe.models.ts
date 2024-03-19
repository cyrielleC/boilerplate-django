import { IngredientChoiceValue } from '@menu/component/ingredient-choice/ingredient-choice.component';
import { FormulaElement, DishElement, Formula, FormulaExtraPrice, Dish } from './api-recipe.models';


export interface FormulaElementWithDishElement extends FormulaElement {
  dishElement: DishElement;
}

export interface ChoicePopUp {
  name: string;
  formula: Formula;
  formulaElementWithDish: FormulaElementWithDishElement[];
  extraPrices: FormulaExtraPrice;
}

export type ChoiceModel = { choice: Dish; subChoice?: IngredientChoiceValue; };

export type DishChoice = {
    // key is formulaElementId
  [key in string]: ChoiceModel[][];
};

export interface FormulaChoice {
  name: string;
  formula: Formula;
  dishChoice?: DishChoice;
  extraPrices?: FormulaExtraPrice;
  price?: number;
}

