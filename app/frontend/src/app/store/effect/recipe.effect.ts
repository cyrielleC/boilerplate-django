import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { getCategoryAction, getDishAction, setCategoryAction, setDishAction } from '../action/recipe.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiRequestService } from '../../service/api-request.service';
import { FoodCategory, Dish, Restaurant } from '../../model/recipe.models';
import { getRestaurantAction, setRestaurantAction } from '../../module/menu/store/menu.actions';


@Injectable()
export class RecipeEffects {

  loadCategory$ = createEffect(() => this.actions$.pipe(
    ofType(getCategoryAction.type),
    exhaustMap(
        () => this.apiRequestService.getFoodCategory()
                .pipe(
                    map((categories: FoodCategory[]) => setCategoryAction({categories})),
                    catchError(() => EMPTY)
                ))
  ));
  loadFood$ = createEffect(() => this.actions$.pipe(
    ofType(getDishAction.type),
    exhaustMap(
        () => this.apiRequestService.getDishes()
                .pipe(
                    map((dishes: Dish[]) => setDishAction({dishes})),
                    catchError(() => EMPTY)
                ))
  ));

  // TODO
  loadRest$ = createEffect(() => this.actions$.pipe(
    ofType(getRestaurantAction.type),
    exhaustMap(
        () => this.apiRequestService.getRestaurant()
                .pipe(
                    map((restaurant: Restaurant) => setRestaurantAction({restaurant})),
                    catchError(() => EMPTY)
                ))
  ));

  constructor(
    private actions$: Actions,
    private readonly apiRequestService: ApiRequestService,
  ) {}
}