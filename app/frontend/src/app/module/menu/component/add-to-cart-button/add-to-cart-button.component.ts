import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { ChoicePopUpComponent, DishElementWithQuantity } from '../choice-pop-up/choice-pop-up.component';
import { OrderService } from '../../service/order.service';
import { DishElement, Formula } from '../../../../model/recipe.models';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  @Input({ required: true }) formula!: Formula;
  @Input({ required: true }) dishElements!: DishElement[];

  constructor(
    private readonly store: Store,
    private readonly dialog: Dialog,
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

    if (dishElementsWithQuantity.length === 0) {
      // TODO add to cart
    }
    else {
      console.log(dishElementsWithQuantity);
      const dialogRef = this.dialog.open<string>(ChoicePopUpComponent, {
        width: '250px',
        data: {
          formula: this.formula,
          dishElements: dishElementsWithQuantity,
        },
      });
    }
  }
}
