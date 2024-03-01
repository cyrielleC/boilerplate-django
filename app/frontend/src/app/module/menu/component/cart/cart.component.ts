import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormulaChoice } from '../choice-pop-up/choice-pop-up.component';
import { selectOrder } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  order$: Observable<FormulaChoice[]> = this.store.select(selectOrder);
  constructor(
    private readonly store: Store,
  ) {
  }
}
