import { Component, Input } from '@angular/core';
import { CategoryService } from '@menu/service/order.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormulaElementWithDishElement } from '@app/model/local-recipe.models';
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
  @Input({ required: true }) formArray!: FormArray<FormArray<ChoiceFormGroup>>;

  constructor(
    protected readonly menuService: CategoryService,
  ){}

  getQuantity(food: Food) {
    return this.formArray.controls.filter((formArray: FormArray<ChoiceFormGroup>) => formArray.controls[0].controls['choice'].value.id === food.id).length;
  }

  removeElement(food: Food) {
    let lastIndex: number = 0;
    this.formArray.controls.forEach((formArray: FormArray<ChoiceFormGroup>, index: number) => {
      if (formArray.controls[0].controls['choice'].value.id === food.id) {
        lastIndex = index;
      }
    });
    this.formArray.removeAt(lastIndex);
  }

  addElement(food: Food, quantity: number) {
    const formArrayValue = new FormArray<ChoiceFormGroup>([]);
    for (let i = 0; i < quantity; i++) {
      const newFormGroup: FormGroup = new FormGroup({
        choice: new FormControl(food)
      });
      if (this.menuService.hasChoice(food)) {
        // the validator is here to have subChoice invalid from the start
        newFormGroup.addControl('subChoice', new FormGroup({}, ingredientChoiceValidator()));
      }
      formArrayValue.push(newFormGroup);
    }
    this.formArray.push(formArrayValue);
  }

  getElementsWithSubChoice(): ChoiceFormGroup[] {
    return this.formArray.controls.flatMap((value: FormArray<ChoiceFormGroup>) => value.controls).filter((el) => el.controls['subChoice']);
  }
}
