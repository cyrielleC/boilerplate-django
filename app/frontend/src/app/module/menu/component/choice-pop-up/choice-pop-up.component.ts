import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Dish, DishElement, FoodType, Formula, Ingredient } from '../../../../model/recipe.models';
import { AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ChoiceFormGroup } from '../category-choice/category-choice.component';

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
export class ChoicePopUpComponent implements OnInit {

  foodType = FoodType;
  formGroupCat: FormGroup<{[key in string]: FormArray<ChoiceFormGroup>}> = new FormGroup({});
  formGroupIng: FormGroup<{[key in string]: FormGroup}> = new FormGroup({});
  choices: (Dish | Ingredient)[] = [];

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ChoicePopUp,
    private cdRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.data.dishElements.forEach((dishElement)=> {
      if (dishElement.food.type === FoodType.CATEGORY) {
        this.formGroupCat.addControl(dishElement.id.toString(), new FormArray<ChoiceFormGroup>([], Validators.required));
      }
      else {
        this.formGroupIng.addControl(dishElement.id.toString(), new FormGroup({}, Validators.required) as FormGroup);
      }
    });
  }

  refresh() {
    this.cdRef.detectChanges();
  }
  submit() {
    console.log(this.formGroupCat.value);
    console.log(this.formGroupIng.value);
  }
}
