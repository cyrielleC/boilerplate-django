import { Action, createReducer, on } from '@ngrx/store';
import { addFoodAction, setFoodAction } from './recipe.actions';
import { Food } from '@app/model/api-recipe.models';

export interface RecipeStoreModel {
  food: Food[],
}

export const initialState: RecipeStoreModel = {food: []};

export const recipeReducer = createReducer(
  initialState,
  on(setFoodAction, (state, { food }) => ({ ...state, food})),
  on(addFoodAction, (state, { food }) => ({ ...state, food: [...state.food, food]})),
);

export function reducer(state: RecipeStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}