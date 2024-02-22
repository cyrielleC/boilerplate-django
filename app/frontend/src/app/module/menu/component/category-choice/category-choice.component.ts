import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish, DishElement, Food, FoodElement, Ingredient } from '../../../../model/recipe.models';
import { OrderService } from '../../service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrl: './category-choice.component.scss'
})
export class CategoryChoiceComponent implements OnInit {
  @Input({ required: true }) set setDishElement(el: DishElement) {
    this.dishElement = el;
    this.categoryElements = this.menuService.getCategorieElements(this.dishElement.food.id);
  };
  @Output() formGroup$ : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() groupHasBeenUpdated$ : EventEmitter<true> = new EventEmitter<true>();
  dishElement: DishElement;
  choice: Food;
  categoryElements: FoodElement<Ingredient | Dish>[];
  formGroup: FormGroup;

  constructor(
    protected readonly menuService: OrderService,
  ){}

  ngOnInit() {
    this.formGroup = new FormGroup({
        'choice': new FormControl(null, Validators.required),
    }, Validators.required);
    this.formGroup$.emit(this.formGroup);
  }

  select($event: MatRadioChange) {
    this.formGroup.removeControl('subChoice');
  }

  update(formGroup: FormGroup) {
    this.formGroup.addControl('subChoice', formGroup);
    this.groupHasBeenUpdated$.emit(true);
  }
}
