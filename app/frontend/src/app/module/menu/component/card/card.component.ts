import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { Observable } from 'rxjs';
import { FoodType, Restaurant } from '@app/model/api-recipe.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  foodType = FoodType;

  restaurant$: Observable<Restaurant | undefined> = this.store.select(selectRestaurant);
  fragment$: Observable<string | null> = this.route.fragment;

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
  ) {}

}
