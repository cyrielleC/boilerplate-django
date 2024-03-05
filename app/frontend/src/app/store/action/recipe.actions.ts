import { createAction, props } from '@ngrx/store';
import { FoodCategory, Dish } from '../../model/api-recipe.models';

export const getCategoryAction = createAction('[Category] Get Categories');
export const setCategoryAction = createAction('[Category] Set Categories', props<{categories: FoodCategory[]}>());

export const getDishAction = createAction('[Category] Get Dish');
export const setDishAction = createAction('[Category] Set Dish', props<{dishes: Dish[]}>());