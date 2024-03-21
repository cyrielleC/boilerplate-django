import { selectFoodByType } from '@admin/store/recipe.selector';
import { Injectable } from '@angular/core';
import { Food, FoodType } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  data$: {[key in FoodType]?: Observable<Food[]>} = {
    [FoodType.DISH]: this.store.select(selectFoodByType(FoodType.DISH)),
    [FoodType.CATEGORY_I]: this.store.select(selectFoodByType(FoodType.CATEGORY_I)),
    [FoodType.INGREDIENT]: this.store.select(selectFoodByType(FoodType.INGREDIENT)),
    [FoodType.CATEGORY_D]: this.store.select(selectFoodByType(FoodType.CATEGORY_D)),
  }


  constructor(
    private readonly store: Store,
  ) { }
}
