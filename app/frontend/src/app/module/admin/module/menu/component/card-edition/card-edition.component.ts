import { selectFoodByType } from '@admin/store/recipe.selector';
import { Component } from '@angular/core';
import { Category, Food, Formula, Restaurant } from '@app/model/api-recipe.models';
import { AbstractWithDragAndDrop } from '@app/module/shared/component/abstract-with-drag-and-drop';
import { CopyService } from '@app/service/copy.service';
import { selectRestaurant } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-card-edition',
  templateUrl: './card-edition.component.html',
  styleUrl: './card-edition.component.scss'
})
export class CategoryEditionComponent extends AbstractWithDragAndDrop {

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
    super();
  }

  addFormula(formulas: Formula[]) {
    formulas.push({
      price: 0,
      description: '',
      elements: [],
    });
  }

  protected isElementToSearch(element1: any, element2: any): boolean {
    return element1 === element2;
  }

}
