import { Component, Input } from '@angular/core';
import { BaseDish, Formula, FormulaType } from '../../../../model/recipe.models';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { FormulaChoicePopUpComponent } from '../formula-choice-pop-up/formula-choice-pop-up.component';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  @Input({ required: true }) elementToAdd!: Formula;
  @Input() formulaChoice: FormulaType | undefined;
  @Input() priceId: string | undefined;

  constructor(
    private readonly store: Store,
    private readonly dialog: Dialog,
    private readonly orderService: OrderService,
  ) {}
  
  addToCart(): void {
    if (!this.orderService.menuNeedsChoice(this.elementToAdd, this.formulaChoice)) {
      // TODO add to cart
    }
    else {
      const dialogRef = this.dialog.open<string>(FormulaChoicePopUpComponent, {
        width: '250px',
        data: {
          elementToAdd: this.elementToAdd,
          formulaChoice: this.formulaChoice,
          priceId: this.priceId,
        },
      });
    }
  }
}
