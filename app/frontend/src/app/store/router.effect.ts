import { Injectable } from '@angular/core';
import { exhaustMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { navigateAction } from './router.actions';


@Injectable()
export class RoutingEffects {

  loadFood$ = createEffect(() => this.actions$.pipe(
    ofType(navigateAction.type),
    exhaustMap(
        ({route}) => {
          console.log([this.router.url, ...route]);

          return this.router.navigate([this.router.url, ...route])
        }
    )
  ), { dispatch: false });
    

  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}
}