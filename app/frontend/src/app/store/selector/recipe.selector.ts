import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeStoreModel } from '../reducer/recipe.reducer';

export const selectRecipeState = createFeatureSelector<RecipeStoreModel>('recipe');

export const selectCategories = createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => state.categories
);
export const selectDishes = createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => state.dishes
);
export const selectIngredients = createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => state.dishes
);

// TODO
export const selectRecipeItemByName = (itemName: string) => createSelector(
    selectRecipeState,
    (state: RecipeStoreModel) => {
      switch (itemName) {
        case 'categories':
          return state.categories;
        case 'dishes':
          return state.dishes;
        case 'ingredients':
          return state.ingredients;
        default:
          return null; // Gérer les cas où le nom n'est pas reconnu
      }
    }
  );