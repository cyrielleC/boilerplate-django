import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '@menu/service/order.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { formArraySizeValidator } from '@app/validaror/form-array-size.validator';
import { DishElementWithQuantity } from '@menu/component/choice-pop-up/choice-pop-up.component';
import { ingredientChoiceValidator } from '@app/validaror/ingredient-choice.validator';
import { Food, FormulaExtraPrice } from '@app/model/api-recipe.models';

export type ChoiceFormGroup = FormGroup<{choice: FormGroup, subChoice?: FormGroup}>;
export type ChoiceWithSubChoiceFormGroup = FormGroup<{choice: FormGroup, subChoice: FormGroup}>;

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrl: './category-choice.component.scss'
})
export class CategoryChoiceComponent implements OnInit {
  @Input({ required: true }) dishElement!: DishElementWithQuantity;
  @Input({ required: true }) extraPrices!: FormulaExtraPrice;
  @Input({ required: true }) formArray!: FormArray<ChoiceFormGroup>;

  constructor(
    protected readonly menuService: CategoryService,
  ){}

  ngOnInit() {
    this.formArray.addValidators(
      formArraySizeValidator(this.dishElement.quantity, this.dishElement.quantity),
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
      // the validator is here to have subChoice invalid from the start
      newFormGroup.addControl('subChoice', new FormGroup({}, ingredientChoiceValidator()));
    }
    this.formArray.push(newFormGroup);
  }

  getElementsWithSubChoice(): ChoiceWithSubChoiceFormGroup[] {
    return this.formArray.controls.filter((el) => el.controls['subChoice']) as ChoiceWithSubChoiceFormGroup[];
  }
}
