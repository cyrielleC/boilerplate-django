import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '@menu/service/order.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormulaElementWithDishElement } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { ingredientChoiceValidator } from '@app/validaror/ingredient-choice.validator';
import { Dish, Food, FormulaExtraPrice } from '@app/model/api-recipe.models';

export type ChoiceFormGroup = FormGroup<{choice: FormControl<Dish>, subChoice: FormGroup<any>}>;

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrl: './category-choice.component.scss'
})
export class CategoryChoiceComponent {
  @Input({ required: true }) formulaElement!: FormulaElementWithDishElement;
  @Input({ required: true }) extraPrices!: FormulaExtraPrice;
  @Input({ required: true }) formArray!: FormArray<ChoiceFormGroup>;

  constructor(
    protected readonly menuService: CategoryService,
  ){}

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

  addElement(food: Food, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      const newFormGroup: FormGroup = new FormGroup({
        choice: new FormControl(food)
      });
      if (this.menuService.hasChoice(food)) {
        // the validator is here to have subChoice invalid from the start
        newFormGroup.addControl('subChoice', new FormGroup({}, ingredientChoiceValidator()));
      }
      this.formArray.push(newFormGroup);
    }
  }

  getElementsWithSubChoice(): ChoiceFormGroup[] {
    return this.formArray.controls.filter((el) => el.controls['subChoice']);
  }
}
