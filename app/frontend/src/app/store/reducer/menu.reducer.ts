import { Action, createReducer, on } from '@ngrx/store';
import { Restaurant } from '../../model/recipe.models';
import { setRestaurantAction } from '../action/menu.actions';

export interface MenuStoreModel {
  restaurant?: Restaurant,
}

export const initialState: MenuStoreModel = {};

export const recipeReducer = createReducer(
  initialState,
  on(setRestaurantAction, (state, { restaurant }) => ({ ...state, restaurant })),
);

export function reducer(state: MenuStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}