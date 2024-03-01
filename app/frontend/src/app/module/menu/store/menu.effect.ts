import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { addToCartAction } from './menu.actions';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  constructor(
    private actions$: Actions,
    private readonly snackBar: MatSnackBar,
    ) {}
}