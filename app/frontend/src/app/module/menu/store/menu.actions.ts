import { createAction, props } from '@ngrx/store';
import { Restaurant } from '@app/model/api-recipe.models';
import { FormulaChoice } from '@app/model/local-recipe.models';

export const getRestaurantAction = createAction('[Menu] Get Menu');
export const setRestaurantAction = createAction('[Menu] Set Menu', props<{restaurant: Restaurant}>());

export const addToCartAction = createAction('[Order] Add To Cart', props<{element: FormulaChoice}>());
export const removeFromCartAction = createAction('[Order] Remove from Cart', props<{index: number}>());