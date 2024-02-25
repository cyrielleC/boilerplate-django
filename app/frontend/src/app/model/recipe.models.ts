

export interface AbstractFood  {
    id: number;
    name: string;
    shortName: string;
    description: string;
    type: FoodType;
    elements: null | (FoodElement<Ingredient | Dish | FoodCategory> | FoodElement<Ingredient>)[];
}

export interface Ingredient extends AbstractFood {
  type: FoodType.INGREDIENT;
  elements: null;
}

export enum FoodType {
    DISH = 'DISH',
    CATEGORY = 'CATEGORY',
    INGREDIENT = 'INGREDIENT',
}

export interface FoodElement<T>  {
    quantity: number;
    child: T;
    isVisible: boolean;
}

export interface Dish extends AbstractFood {
    elements: FoodElement<Ingredient | FoodCategory>[];
    type: FoodType.DISH;
}

export interface FoodCategory extends AbstractFood {
    elements: FoodElement<Ingredient | Dish>[];
    type: FoodType.CATEGORY;
}

export type Food = Dish | FoodCategory | Ingredient;
export type FoodWithElements = Dish | FoodCategory;

export interface Restaurant {
  name: string;
  number: string;
  address: string;
  categories: Category[];
  foodcategories: FoodCategory[];
}

export interface Category {
  name: string;
  elements: CategoryElement[];
  shortDescription: string;
}
// category-element.model.ts
export interface CategoryElement {
  id: number;
  name: string | null;
  description: string | null;
  extras: FoodElementWithPrice[];
  order: number;
  elements: DishElement[];
  formulas: Formula[]
  formulaExtraPrices: FormulaExtraPrice[]
}

export interface DishElement {
  id: number;
  name: string;
  food: FoodWithElements;
}

export interface Formula {
  id: number;
  price: number;
  description: string | null;
  elements: FormulaElement[];
}

export interface FormulaElement {
  dishElementId: number;
  order: number;
  quantity: number;
}

export interface FormulaExtraPrice {
  foodId: number;
  price: number;
}

export interface FoodElementWithPrice {
  quantity: number;
  food: Food;
  price: number;
  includedNumber: number;
  order: number;
}

export interface OrderFormula {
  id: number;
  price: number;
  elements: OrderFormulaElement[];
}

export interface OrderFormulaElement {
  categoryChoices: number;
  price: number;
}

export interface IngredientChoice {
  formulaElementId: number;
  ingredientId: number;
}
