import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Dish, DishElement, FoodType, Formula, Ingredient } from '../../../../model/recipe.models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface DishElementWithQuantity extends DishElement{
  quantity: number;
}

export interface ChoicePopUp {
  formula: Formula,
  dishElements: DishElementWithQuantity[],
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

  updateFormGroup(formGroup: FormControl, dishElement: DishElement) {
    this.formGroup.addControl(dishElement.id.toString(), formGroup);
    this.cdRef.detectChanges();
    console.log(this.formGroup);
  }
  refresh() {
    this.cdRef.detectChanges();
  }
  submit() {
    console.log([this.data.formula, this.formGroup.value]);
  }
}
