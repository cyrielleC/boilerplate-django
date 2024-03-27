import { Component, Input } from '@angular/core';
import { CategoryElement, DishElement, FormulaElement } from '@app/model/api-recipe.models';

@Component({
  selector: 'app-formulas-explanation',
  templateUrl: './formulas-explanation.component.html',
  styleUrl: './formulas-explanation.component.scss'
})
export class FormulasExplanationComponent {
  @Input({ required: true }) categoryElement: CategoryElement;

  getFormulaElAssociatedDishElement(formulaEl: FormulaElement): DishElement {
    return this.categoryElement.elements.find((el) => el.id === formulaEl.dishElementId)!;
  }
}
