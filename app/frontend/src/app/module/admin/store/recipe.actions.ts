import { Food } from '@app/model/api-recipe.models';
import { createAction, props } from '@ngrx/store';

export const getFoodAction = createAction('[Category] Get Food');
export const createFoodAction = createAction('[Category] Create Food', props<{food: Partial<Food>}>());
export const addFoodAction = createAction('[Category] Add Food to existing set', props<{food: Food}>());
export const setFoodAction = createAction('[Category] Set Food', props<{food: Food[]}>());