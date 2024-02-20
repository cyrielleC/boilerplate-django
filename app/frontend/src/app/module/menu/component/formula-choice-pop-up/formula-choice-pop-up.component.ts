import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Formula, FormulaType } from '../../../../model/recipe.models';

export interface ChoicePopUp {
  elementToAdd: Formula,
  formulaChoice: FormulaType | undefined,
  priceId: string | undefined,
}


@Component({
  selector: 'app-formula-choice-pop-up',
  templateUrl: './formula-choice-pop-up.component.html',
  styleUrl: './formula-choice-pop-up.component.scss'
})
export class FormulaChoicePopUpComponent {

  formulaType = FormulaType;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ChoicePopUp,
  ) {}


}
