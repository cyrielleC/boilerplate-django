import { Component, Input, OnInit } from '@angular/core';
import { Dish, FoodCategory, FoodElement, FoodType, FormulaExtraPrice, Ingredient } from '@app/model/api-recipe.models';
import { CategoryService } from '@menu/service/order.service';
import { FormControl, Validators } from '@angular/forms';
import { removeLastOccurrence } from '@app/utils/removeLastOccurence';
import { formControlArraySizeValidator } from '@app/validaror/form-control-array-size.validator';
import { ChoiceFormGroup } from '../category-choice/category-choice.component';

export type IngredientChoiceValue = {
  // the key is a food category id
  [key in string]: Ingredient[];
}

@Component({
  selector: 'app-ingredient-choice',
  templateUrl: './ingredient-choice.component.html',
  styleUrl: './ingredient-choice.component.scss'
})
export class IngredientChoiceComponent implements OnInit {
  @Input({ required: true }) extraPrices!: FormulaExtraPrice;
  @Input({ required: true }) formArray!: ChoiceFormGroup;
  @Input() number: number = 1;
  foodCategoryElements: (FoodElement<FoodCategory | Ingredient>
  & {
    elements: FoodElement<Ingredient | Dish>[];
  })[];

  constructor(
    protected readonly menuService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.foodCategoryElements = this.formArray.controls['choice'].value.elements
      .filter((el: FoodElement<Ingredient | FoodCategory>) => el.child.type === FoodType.CATEGORY)
      .map((el: FoodElement<Ingredient | FoodCategory>) => {
        return {
          ...el,
          elements: this.menuService.getFlattenCategorieElements(el.child.id)
        }
      });
      
    this.foodCategoryElements.forEach((el) => {
        this.formArray.controls['subChoice']!.addControl(el.child.id.toString(), new FormControl(
          [], [Validators.required, formControlArraySizeValidator(el.quantity, el.quantity)]
          ));
      });
  }

  getQuantity(foodCategoryId: number, ingredientId: number): number {
    return this.formArray.controls['subChoice'].controls[foodCategoryId].value.filter((el: Ingredient)=> ingredientId === el.id).length;
  }

  addElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formArray.controls['subChoice'].controls[foodCategoryId].value.push(
      ingredient
    );
    this.formArray.controls['subChoice'].controls[foodCategoryId].setValue(
      [...this.formArray.controls['subChoice'].controls[foodCategoryId].value]
    );
  }
  
  removeElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formArray.controls['subChoice'].controls[foodCategoryId].setValue(removeLastOccurrence([...this.formArray.controls['subChoice'].controls[foodCategoryId].value], ingredient));
  }

  setSoleElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formArray.controls['subChoice'].controls[foodCategoryId].setValue([ingredient]);
  }
}
