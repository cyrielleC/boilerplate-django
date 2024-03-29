import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '@menu/store/menu.selector';
import { Observable } from 'rxjs';
import { CategoryElement, DishElement, FoodType, Formula, Restaurant } from '@app/model/api-recipe.models';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@menu/service/order.service';
import { Dialog } from '@angular/cdk/dialog';
import { FormulaChoice, FormulaElementWithDishElement } from '@app/model/local-recipe.models';
import { addToCartAction } from '@menu/store/menu.actions';
import { ChoicePopUpComponent } from '../choice-pop-up/choice-pop-up.component';

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
    private readonly dialog: Dialog,
    private readonly orderService: OrderService,
    private readonly store: Store,
    private route: ActivatedRoute,
  ) {}

  addToCart(formula: Formula, name: string, categoryElement: CategoryElement): void {
    const dishElementsWithQuantity: FormulaElementWithDishElement[] = categoryElement.elements
    .filter((el: DishElement) =>
      formula!.elements.some(formulaEl => formulaEl.dishElementId === el.id)
      && this.orderService.hasChoice(el.food) 
    ).map((el) => {
      const formulaEl = formula!.elements.find(formulaEl => formulaEl.dishElementId === el.id)!;
      return {
        ...formulaEl,
        dishElement: el,
      };
    });

    const actionPayload: FormulaChoice = {
      formula,
      name,
    };

    if (dishElementsWithQuantity.length === 0) {
      this.store.dispatch(addToCartAction({
        element: actionPayload
      }));
    }
    else {
      this.dialog.open<string>(ChoicePopUpComponent, {
        panelClass: 'choice-pop-up-container',
        width: '100%',
        data: {
          ...actionPayload,
          formulaElementWithDish: dishElementsWithQuantity,
          extraPrices: categoryElement.formulaExtraPrices
        }
      });
    }
  }
}
