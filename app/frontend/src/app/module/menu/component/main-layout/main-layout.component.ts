import { Component } from '@angular/core';
import { Restaurant } from '@app/model/api-recipe.models';
import { selectRestaurant } from '@menu/store/menu.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  restaurant$: Observable<Restaurant | undefined> = this.store.select(selectRestaurant);

  constructor(
    private readonly store: Store,
  ) {}

  openLocation(locationUrl: string): void {
    window.open(locationUrl, '_blank');
  }
}
