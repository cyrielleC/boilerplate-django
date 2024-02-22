import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Dish, DishElement, FoodType, Formula, Ingredient } from '../../../../model/recipe.models';
import { FormGroup } from '@angular/forms';

export interface ChoicePopUp {
  formula: Formula,
  dishElements: DishElement[],
}

@Component({
  selector: 'app-choice-pop-up',
  templateUrl: './choice-pop-up.component.html',
  styleUrl: './choice-pop-up.component.scss'
})
export class ChoicePopUpComponent {

  foodType = FoodType;
  formGroup: FormGroup = new FormGroup({});
  choices: (Dish | Ingredient)[] = [];

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ChoicePopUp,
    private cdRef: ChangeDetectorRef,
  ) {}

  updateFormGroup(formGroup: FormGroup, foodId: number) {
    this.formGroup.addControl(foodId.toString(), formGroup);
    this.cdRef.detectChanges();
  }
  refresh() {
    this.cdRef.detectChanges();
  }
}
