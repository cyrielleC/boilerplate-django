

export interface Ingredient  {
    id: number;
    name: string;
    shortName: string;
    description: string;
    type: FoodType;
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

export interface Dish  extends Ingredient {
    elements: FoodElement<Ingredient>[];
}

export interface FoodCategory extends Ingredient {
    elements: FoodElement<Ingredient | Dish>[];
}

export type Food = Dish | FoodCategory;


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
}

export interface DishElement {
  id: number;
  name: string;
  quantity: number;
  food: Food;
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
}

export interface FoodElementWithPrice {
  quantity: number;
  food: Food;
  price: number;
  includedNumber: number;
  order: number;
}
