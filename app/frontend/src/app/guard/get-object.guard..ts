import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ObjectGetterService } from '../service/object-getter.service';


export const GetObjectsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
) => {
  const objectGetterService = inject(ObjectGetterService);
  const observableToWaitFor: Observable<boolean>[] = [];
  route.data['objectsConfig'].forEach((element: [MemoizedSelector<any, any>, TypedAction<any>]) => {
    observableToWaitFor.push(objectGetterService.getObject(element[0], element[1]));
  });

  return combineLatest(observableToWaitFor).pipe(
    filter((arrayOfBooleans: boolean[]) => !arrayOfBooleans.some(el => el!== true)),
    map(()=> true)
  );
}