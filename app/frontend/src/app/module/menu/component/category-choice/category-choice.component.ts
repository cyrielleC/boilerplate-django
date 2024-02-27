import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { FormArray, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { arraySizeValidator } from '../../../../validaror/array-size.validator';
import { DishElementWithQuantity } from '../choice-pop-up/choice-pop-up.component';
import { Food } from '../../../../model/recipe.models';
import { ingredientChoiceValidator } from '../../../../validaror/ingredient-choice.validator';

export type ChoiceFormGroup = FormGroup<{choice: FormGroup, subChoice?: FormGroup}>;

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrl: './category-choice.component.scss'
})
export class CategoryChoiceComponent implements OnInit {
  @Input({ required: true }) dishElement!: DishElementWithQuantity;
  @Input({ required: true }) formArray!: FormArray<ChoiceFormGroup>;
  @Output() groupHasBeenUpdated$ : EventEmitter<true> = new EventEmitter<true>();

  constructor(
    protected readonly menuService: OrderService,
  ){}

  ngOnInit() {
    this.formArray.addValidators(
      arraySizeValidator(this.dishElement.quantity, this.dishElement.quantity),
    );
  }

  getElements(foodCategoryId: number) {
    return this.menuService.getCategorieElements(foodCategoryId).map((el) =>{
      return {
        'id': el.child.id,
        'name': el.child.name,
        'quantity': el.quantity, 
      };
    })
  }

  getQuantity(food: Food) {
    return this.formArray.controls.filter((formGroup: any) => formGroup.controls['choice'].value.id === food.id).length;
  }

  removeElement(food: Food) {
    let lastIndex: number = 0;
    this.formArray.controls.forEach((formGroup: any, index: number) => {
      if (formGroup.controls['choice'].value.id === food.id) {
        lastIndex = index;
      }
    });
    this.formArray.removeAt(lastIndex);
  }

  addElement(food: Food) {
    const newFormGroup: FormGroup = new FormGroup({
      choice: new FormControl(food)
    });
    if (this.menuService.hasChoice(food)) {
      newFormGroup.addControl('subChoice', new FormGroup({}, ingredientChoiceValidator()));
    }
    this.formArray.push(newFormGroup);
  }
}
