import { selectFoodByType, selectFoodCategories } from '@admin/store/recipe.selector';
import { Injectable } from '@angular/core';
import { Food, FoodDishCategory, FoodIngredientCategory, FoodType } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  categories: (FoodDishCategory | FoodIngredientCategory)[];

  data$: {[key in FoodType]: Observable<Food[]>} = {
    [FoodType.DISH]: this.store.select(selectFoodByType(FoodType.DISH)),
    [FoodType.CATEGORY_I]: this.store.select(selectFoodByType(FoodType.CATEGORY_I)),
    [FoodType.INGREDIENT]: this.store.select(selectFoodByType(FoodType.INGREDIENT)),
    [FoodType.CATEGORY_D]: this.store.select(selectFoodByType(FoodType.CATEGORY_D)),
  }

  constructor(
    private readonly store: Store,
  ) { 
    this.store.select(selectFoodCategories)
      .pipe(
        tap(
          (categories: Food[]) => {
          this.categories = categories as (FoodDishCategory | FoodIngredientCategory)[];
        }),
      )
      .subscribe();
  }

  getCategorieElements(categoryId: number) {
    return this.categories.find(el => el.id === categoryId)?.elements ?? [];
  }


}
