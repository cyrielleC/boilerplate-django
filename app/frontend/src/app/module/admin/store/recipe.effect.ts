import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addFoodAction, createFoodAction, getFoodAction, setFoodAction } from './recipe.actions';
import { Router } from '@angular/router';
import { Food } from '@app/model/api-recipe.models';
import { ApiRequestService } from '@app/service/api-request.service';
import { navigateAction } from '@app/store/router.actions';


@Injectable()
export class RecipeEffects {

  loadFood$ = createEffect(() => this.actions$.pipe(
    ofType(getFoodAction.type),
    exhaustMap(
        () => this.apiRequestService.getFood()
                .pipe(
                    map((food: Food[]) => setFoodAction({food})),
                    catchError(() => EMPTY)
                ))
  ));

  createFood$ = createEffect(() => this.actions$.pipe(
    ofType(createFoodAction.type),
    exhaustMap(
        ({food}) => this.apiRequestService.createFood(food)
                .pipe(
                    switchMap((food: Food) => [
                      // navigateAction({route: ['/..']}),
                      navigateAction({route: ['food', food.type.toLowerCase(), food.id.toString()]}),
                      addFoodAction({food}),
                    ]),
                    catchError(() => EMPTY)
                ))
  ));

  constructor(
    private actions$: Actions,
    private readonly apiRequestService: ApiRequestService,
    private readonly router: Router,
  ) {}
}