import { Action, createReducer, on } from '@ngrx/store';
import { Categories, Food } from '../../model/recipe.models';
import { setFood, setCategory } from '../action/recipe.actions';

export interface recipeStoreModel {
  food: Food[],
  categories: Categories[]
}

export const initialState: recipeStoreModel = {food: [], categories: []};

export const recipeReducer = createReducer(
  initialState,
  on(setFood, (state, { food }) => ({ ...state, food })),
  on(setCategory, (state, { categories }) => ({ ...state, categories })),
);

export function reducer(state: recipeStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}