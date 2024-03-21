import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeStoreModel } from './recipe.reducer';
import { Food, FoodType } from '@app/model/api-recipe.models';

export const selectRecipeState = createFeatureSelector<RecipeStoreModel>('recipe');

export const selectFoodByType = (itemName: FoodType | null = null) => createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => {
      if (!itemName) {
        return state.food;
      }
      return state.food.filter((food: Food) => food.type === itemName) ?? [];
    }
  );
export const selectFoodById = (foodId: string) => createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => {
      return state.food.find((food: Food) => food.id.toString() === foodId)!;
    }
  );