import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { ChoicePopUpComponent, DishElementWithQuantity, FormulaChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { CategoryService } from '@menu/service/order.service';
import { CategoryElement, Formula } from '@app/model/recipe.models';
import { addToCartAction } from '@menu/store/menu.actions';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formulaId!: number;
  @Input({ required: true }) categoryElement!: CategoryElement;

  constructor(
    private readonly dialog: Dialog,
    private readonly store: Store,
    private readonly orderService: CategoryService,
  ) {}
  
  addToCart(): void {

    let formula: Formula | undefined = this.categoryElement.formulas.find((fomulaEl) => fomulaEl.id === this.formulaId);
    let dishElementsWithQuantity: DishElementWithQuantity[] = this.categoryElement.elements
    .filter((el) =>
      formula!.elements.some(formulaEl => formulaEl.dishElementId === el.id)
      && this.orderService.hasChoice(el.food) 
    ).map((el) => {
      return {
        ...el,
        quantity: formula!.elements.find(formulaEl => formulaEl.dishElementId === el.id)?.quantity ?? 1,
      };
    });

    const actionPayload: FormulaChoice = {
      formula: formula!,
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
          dishElements: dishElementsWithQuantity,
          extraPrices: this.categoryElement.formulaExtraPrices
        }
      });
    }
  }
}
