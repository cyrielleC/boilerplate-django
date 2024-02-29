import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { ChoicePopUpComponent, DishElementWithQuantity, FormulaChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { OrderService } from '@menu/service/order.service';
import { DishElement, Formula } from '@app/model/recipe.models';
import { addToCartAction } from '@menu/store/menu.actions';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formula!: Formula;
  @Input({ required: true }) dishElements!: DishElement[];

  constructor(
    private readonly dialog: Dialog,
    private readonly store: Store,
    private readonly orderService: OrderService,
  ) {}
  
  addToCart(): void {
    let dishElementsWithQuantity: DishElementWithQuantity[] = this.dishElements
    .filter((el) =>
      this.formula.elements.some(formulaEl => formulaEl.dishElementId === el.id)
      && this.orderService.hasChoice(el.food) 
    ).map((el) => {
      return {
        ...el,
        quantity: this.formula.elements.find(formulaEl => formulaEl.dishElementId === el.id)?.quantity ?? 1
      };
    });

    const actionPayload: FormulaChoice = {
      formula: this.formula,
      name: this.name,
    };

    if (dishElementsWithQuantity.length === 0) {
      this.store.dispatch(addToCartAction({
        element: actionPayload
      }));
    }
    else {
      const dialogRef = this.dialog.open<string>(ChoicePopUpComponent, {
        width: '100%',
        data: {
          ...actionPayload,
          dishElements: dishElementsWithQuantity
        }
      });
    }
  }
}
