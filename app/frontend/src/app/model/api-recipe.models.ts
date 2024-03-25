

export interface ObjectWithId {
  id: number;
}

export enum FoodType {
  DISH = 'DISH',
  CATEGORY_I = 'CATEGORY_I',
  CATEGORY_D = 'CATEGORY_D',
  INGREDIENT = 'INGREDIENT',
}

export const CATEGORIES = [FoodType.CATEGORY_D, FoodType.CATEGORY_I];

export interface FoodElement<T>  {
  quantity: number;
  order: number;
  child: T;
  isVisible: boolean;
}

export interface AbstractFood extends ObjectWithId {
    name: string;
    shortName?: string;
    description?: string;
    type: FoodType;
    elements: null | (FoodElement<Dish | FoodDishCategory > | FoodElement<Ingredient | FoodIngredientCategory>)[];
}

export interface Ingredient extends AbstractFood {
  type: FoodType.INGREDIENT;
  elements: null;
}


export interface Dish extends AbstractFood {
    elements: FoodElement<Ingredient | FoodIngredientCategory>[];
    type: FoodType.DISH;
}

export interface  FoodDishCategory extends AbstractFood {
    elements: FoodElement<Dish | FoodDishCategory>[];
    type: FoodType.CATEGORY_D;
}

export interface FoodIngredientCategory extends AbstractFood {
    elements: FoodElement<Ingredient | FoodIngredientCategory>[];
    type: FoodType.CATEGORY_I;
}

export type Food = Dish | FoodDishCategory | Ingredient | FoodIngredientCategory;
export type FoodWithElements = Dish | FoodDishCategory;

export interface Restaurant {
  name: string;
  number: string;
  address: string;
  addressLink: string;
  categories: Category[];
  foodcategories: FoodDishCategory[];
}

export interface Category {
  id: number;
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
  formulaExtraPrices: FormulaExtraPrice
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
  id: number;
  dishElementId: number;
  order: number;
  quantity: number;
}

export type FormulaExtraPrice = {
  [key: number]: number;
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
