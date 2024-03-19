import { Injectable } from '@angular/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectGetterService {

  constructor(
    private readonly store: Store,
  ) {}

  getObject(selector: MemoizedSelector<any, any>, action: TypedAction<any>): Observable<boolean> {
    return this.store.select(selector).pipe(
        tap((el) => {
          if (!el) {
            this.store.dispatch(action);
          }
        }),
        filter((el) => !!el && (el.length === undefined || el.length > 0)),
        map(() => true),
        // TODO
        // catchError(() => {}),
    );
  }
}
