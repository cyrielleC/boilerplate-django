import { Action, createReducer, on } from '@ngrx/store';
import { Restaurant } from '@app/model/recipe.models';
import { addToCartAction, removeFromCartAction, setRestaurantAction } from '@menu/store/menu.actions';
import { FormulaChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';

export interface MenuStoreModel {
  restaurant?: Restaurant,
  order: FormulaChoice[];
}

export const initialState: MenuStoreModel = {order: []};

export const recipeReducer = createReducer(
  initialState,
  on(setRestaurantAction, (state, { restaurant }) => ({ ...state, restaurant })),
  on(addToCartAction, (state, { element }) => ({ ...state, order: [...state.order ?? [], element] })),
  on(removeFromCartAction, (state, { index }) => { 
    const order = [...state.order] ?? [];
    order.splice(index, 1);
    return {...state, order};
  }),
);

export function reducer(state: MenuStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}