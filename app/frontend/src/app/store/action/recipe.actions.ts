import { createAction, props } from '@ngrx/store';
import { Categories, Food } from '../../model/recipe.models';

export const getCategory = createAction('[Category] Get Categories');
export const setCategory = createAction('[Category] Set Categories', props<{categories: Categories[]}>());

export const getFood = createAction('[Category] Get Food');
export const setFood = createAction('[Category] Set Food', props<{food: Food[]}>());