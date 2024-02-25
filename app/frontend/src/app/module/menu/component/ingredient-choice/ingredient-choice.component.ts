import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish, Food, FoodCategory, FoodElement, FoodType, FoodWithElements, Ingredient } from '../../../../model/recipe.models';
import { OrderService } from '../../service/order.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { arraySizeValidator } from '../../../../validaror/array-size.validator';

@Component({
  selector: 'app-ingredient-choice',
  templateUrl: './ingredient-choice.component.html',
  styleUrl: './ingredient-choice.component.scss'
})
export class IngredientChoiceComponent implements OnInit {
  @Input({ required: true }) food!: Dish;
  elements: FoodElement<FoodCategory | Ingredient>[];
  @Output() formGroup$ : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  foodType = FoodType;
  formGroup: FormGroup;

  constructor(
    protected readonly menuService: OrderService,
    protected readonly formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    const groupContent: { [key: number]: FormControl } = {};
    this.elements = this.food.elements.filter((el) => el.child.type === FoodType.CATEGORY);
    this.elements.forEach((el) => {
        groupContent[el.child.id] = new FormControl(
          [], [Validators.required, arraySizeValidator(el.quantity, el.quantity)]);
      }
    );
    this.formGroup = new FormGroup(groupContent, Validators.required);
    this.formGroup$.emit(this.formGroup);
  }
}
