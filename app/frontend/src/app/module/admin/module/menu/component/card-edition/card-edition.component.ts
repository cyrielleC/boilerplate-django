import { selectFoodByType } from '@admin/store/recipe.selector';
import { Component } from '@angular/core';
import { Category, Food, Restaurant } from '@app/model/api-recipe.models';
import { CopyService } from '@app/service/copy.service';
import { selectRestaurant } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-card-edition',
  templateUrl: './card-edition.component.html',
  styleUrl: './card-edition.component.scss'
})
export class CategoryEditionComponent {

  categories$: Observable<Category[]> = this.store.select(selectRestaurant).pipe(
    map((restaurant: Restaurant) => CopyService.clone(restaurant.categories)),
  );

  dishChoices$: Observable<Food[]> =
    this.store.select(
      selectFoodByType()
    ) as Observable<Food[]>;

  constructor(
    private readonly store: Store,
  ) {
  }

}
