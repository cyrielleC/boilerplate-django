import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../../model/recipe.models';

export const getRestaurantAction = createAction('[Menu] Get Menu');
export const setRestaurantAction = createAction('[Menu] Set Menu', props<{restaurant: Restaurant}>());
