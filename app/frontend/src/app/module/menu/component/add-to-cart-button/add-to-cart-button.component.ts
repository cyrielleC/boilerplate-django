import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { ChoicePopUpComponent, FormulaElementWithDishElement, FormulaChoice } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { CategoryService } from '@menu/service/order.service';
import { addToCartAction } from '@menu/store/menu.actions';
import { CategoryElement, DishElement, Formula } from '@app/model/api-recipe.models';

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
    let dishElementsWithQuantity: FormulaElementWithDishElement[] = this.categoryElement.elements
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
          formulaElementWithDish: dishElementsWithQuantity,
          extraPrices: this.categoryElement.formulaExtraPrices
        }
      });
    }
  }
}
