import { Action, createReducer, on } from '@ngrx/store';
import { addFoodAction, removeInStoreFoodAction, setFoodAction, updateInStoreFoodAction } from './recipe.actions';
import { Food } from '@app/model/api-recipe.models';

export interface RecipeStoreModel {
  food: Food[],
}

export const initialState: RecipeStoreModel = {food: []};

export const recipeReducer = createReducer(
  initialState,
  on(setFoodAction, (state, { food }) => ({ ...state, food})),
  on(addFoodAction, (state, { food }) => ({ ...state, food: [...state.food, food]})),
  on(removeInStoreFoodAction, (state, { food }) => ({ ...state, 
    // @ts-ignore
    food: 
    [...state.food.filter(el => el.id !== food.id).map((el: Food) => {
      return {
        ...el,
        elements: el.elements.filter(el => el.child.id !== food.id)
      }
    })]
  })),
  on(updateInStoreFoodAction, (state, { food }) => ({ ...state, food: 
    [...state.food].map((elFood: Food) => { return food.id === elFood.id ? food : elFood})
  })),
);

export function reducer(state: RecipeStoreModel | undefined, action: Action) {
  return recipeReducer(state, action);
}