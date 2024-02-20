

export interface Ingredient  {
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
  sizes: DishSize[]
}

export interface Category {
  name: string;
  restaurant: Restaurant; // Reference to the parent Restaurant object
  menus: Formula[];
  shortDescription: string;
}

export enum MenuType {
  SEVERALSIZE = 'SEVERALSIZE',
  FORMULA = 'FORMULA',
  SIMPLE = 'SIMPLE'
}

export interface BaseDish {
  name: string | null;
  description: string | null;
  [FormulaType.price]: number | null;
  prices: PriceSize[] | null;
  quantity: number;
  food: Food; // Reference to the related Food object
  extras: FoodElementWithPrice[];
  order: number;
  type: MenuType;
}

export interface PriceSize {
  pizzaMenu: BaseDish; // Reference to the related BaseDish object
  size: string; // Reference to the related DishSize object
  price: number;
}

export interface DishSize {
    id: string;
    name: string;
}

export interface Formula extends BaseDish {
  starter: Food; // Reference to the related Food object
  dessert: Food; // Reference to the related Food object
  [FormulaType.starterDishPrice]: number | null;
  [FormulaType.dishDessertPrice]: number | null;
  [FormulaType.allPrice]: number | null;
}

export interface FoodElementWithPrice {
    quantity: number;
    food: Food;
    price: number;
    includedNumber: number;
    order: number;
  }

export enum FormulaType {
  'price' = 'price',
  'allPrice' = 'allPrice',
  'starterDishPrice' = 'starterDishPrice',
  'dishDessertPrice' = 'dishDessertPrice',
}
