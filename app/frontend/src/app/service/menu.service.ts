import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCategories } from '../store/selector/recipe.selector';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly store: Store,
  ) {}

  getMenu(): Observable<any> {
    return this.store.select(selectCategories).pipe(
        
    );
  }
}
