import { Category, Food } from '@app/model/api-recipe.models';
import { createAction, props } from '@ngrx/store';

export const getFoodAction = createAction('[Recipe] Get Food');
export const createFoodAction = createAction('[Recipe] Create Food', props<{food: Partial<Food>}>());
export const updateFoodAction = createAction('[Recipe] Update Food', props<{food: Partial<Food>}>());
export const deleteFoodAction = createAction('[Recipe] Delete Food', props<{food: Partial<Food>}>());
export const addFoodAction = createAction('[Recipe] Add Food to existing set', props<{food: Food}>());
export const setFoodAction = createAction('[Recipe] Set Food', props<{food: Food[]}>());
export const updateInStoreFoodAction = createAction('[Recipe] update specific Food', props<{food: Food}>());
export const removeInStoreFoodAction = createAction('[Recipe] remove specific Food', props<{food: Food}>());
