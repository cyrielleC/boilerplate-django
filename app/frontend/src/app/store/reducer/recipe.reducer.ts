import { Action, createReducer, on } from '@ngrx/store';
import { FoodCategory, Dish, Ingredient } from '../../model/api-recipe.models';
import { setDishAction, setCategoryAction } from '../action/recipe.actions';

export interface RecipeStoreModel {
  dishes: Dish[],
  categories: FoodCategory[],
  ingredients: Ingredient[],
}

export const initialState: RecipeStoreModel = {dishes: [], categories: [],ingredients: []};

export const recipeReducer = createReducer(
  initialState,
  on(setDishAction, (state, { dishes }) => ({ ...state, dishes: dishes })),
  on(setCategoryAction, (state, { categories }) => ({ ...state, categories })),
);

export function reducer(state: RecipeStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}