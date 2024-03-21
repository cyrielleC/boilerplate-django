import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, tap } from 'rxjs';
import { addToCartAction, getRestaurantAction, setRestaurantAction } from './menu.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiRequestService } from '@app/service/api-request.service';
import { Restaurant } from '@app/model/api-recipe.models';


@Injectable()
export class MenuEffects {

  displayAddToCartSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(addToCartAction.type),
    tap(
        () => {
            this.snackBar.open('Ajoutée au panier', 'ok');
        }
    )
  ), { dispatch: false });

  // TODO
  loadRest2$ = createEffect(() => this.actions$.pipe(
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
    private readonly snackBar: MatSnackBar,
    private readonly apiRequestService: ApiRequestService,
    ) {}
}