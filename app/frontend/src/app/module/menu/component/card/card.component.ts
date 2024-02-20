import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuType, Restaurant } from '../../../../model/recipe.models';
import { selectRestaurant } from '../../../../store/selector/recipe.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  restaurant$: Observable<Restaurant | undefined> = this.store.select(selectRestaurant);

  menuType = MenuType;

  constructor(
    private readonly store: Store,
  ) {}

}
