import { Component, Input, OnInit } from '@angular/core';
import { Dish, FoodCategory, FoodElement, FoodType, Ingredient } from '@app/model/recipe.models';
import { CategoryService } from '@menu/service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { removeLastOccurrence } from '@app/utils/removeLastOccurence';
import { formControlArraySizeValidator } from '@app/validaror/form-control-array-size.validator';

export type IngredientChoiceValue = {
  [key in string]: Ingredient[];
}

@Component({
  selector: 'app-ingredient-choice',
  templateUrl: './ingredient-choice.component.html',
  styleUrl: './ingredient-choice.component.scss'
})
export class IngredientChoiceComponent implements OnInit {
  @Input({ required: true }) food!: Dish;
  @Input({ required: true }) formGroup!: FormGroup;
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
    this.foodCategoryElements = this.food.elements
      .filter((el) => el.child.type === FoodType.CATEGORY)
      .map((el) => {
        return {
          ...el,
          elements: this.menuService.getFlattenCategorieElements(el.child.id)
        }
      });
      
    this.foodCategoryElements.forEach((el) => {
      this.formGroup.addControl(el.child.id.toString(), new FormControl(
        [], [Validators.required, formControlArraySizeValidator(el.quantity, el.quantity)]
        ));
    });
  }

  getQuantity(foodCategoryId: number, ingredientId: number): number {
    return this.formGroup.controls[foodCategoryId].value.filter((el: Ingredient)=> ingredientId === el.id).length;
  }

  addElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formGroup.controls[foodCategoryId].value.push(
      ingredient
    );
    this.formGroup.controls[foodCategoryId].setValue(
      [...this.formGroup.controls[foodCategoryId].value]
    );
  }
  
  removeElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formGroup.controls[foodCategoryId].setValue(removeLastOccurrence([...this.formGroup.controls[foodCategoryId].value], ingredient));
  }

  setSoleElement(foodCategoryId: number, ingredient: Ingredient | Dish): void {
    this.formGroup.controls[foodCategoryId].setValue([ingredient]);
  }
}
