import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormulaChoice } from '@app/model/local-recipe.models';
import { selectOrder } from '@menu/store/menu.selector';
import { removeFromCartAction } from '@menu/store/menu.actions';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrl: './cart-menu.component.scss'
})
export class CartMenuComponent {
  order$: Observable<FormulaChoice[]> = this.store.select(selectOrder);
  constructor(
    private readonly store: Store,
  ) {
  }

  removeItem(index: number) {
    this.store.dispatch(removeFromCartAction({index}));
  }
}
