import { Component, Input, OnInit } from '@angular/core';
import { Dish, FoodCategory, FoodElement, FoodType, Ingredient } from '../../../../model/recipe.models';
import { OrderService } from '../../service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arraySizeValidator } from '../../../../validaror/array-size.validator';
import { removeLastOccurrence } from '../../../../utils/removeLastOccurence';

@Component({
  selector: 'app-ingredient-choice',
  templateUrl: './ingredient-choice.component.html',
  styleUrl: './ingredient-choice.component.scss'
})
export class IngredientChoiceComponent implements OnInit {
  @Input({ required: true }) food!: Dish;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() number: number = 1;
  foodCategoryElements: FoodElement<FoodCategory | Ingredient>[];

  constructor(
    protected readonly menuService: OrderService,
  ) {
  }

  ngOnInit() {
    this.foodCategoryElements = this.food.elements.filter((el) => el.child.type === FoodType.CATEGORY);
    this.foodCategoryElements.forEach((el) => {
      this.formGroup.addControl(el.child.id.toString(), new FormControl(
        [], [Validators.required, arraySizeValidator(el.quantity, el.quantity)]
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
    this.formGroup.controls[foodCategoryId].setValue([...removeLastOccurrence(this.formGroup.controls[foodCategoryId].value, ingredient)]);
  }
}
