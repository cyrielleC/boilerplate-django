import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFood, Food } from '@app/model/api-recipe.models';

type formGroupKeys = keyof Pick<AbstractFood,'id' | 'name' | 'description' | 'shortName'>;

@Component({
  selector: 'app-basic-food-form',
  templateUrl: './basic-food-form.component.html',
  styleUrl: './basic-food-form.component.scss'
})
export class BasicFoodFormComponent implements OnInit {
  @Input({required: true}) food: Partial<Food>;
  @Input({ required: true }) formGroup: FormGroup<{
    [el in formGroupKeys]: FormControl;
  }>;

  ngOnInit(): void {
    if(this.food.id) {
      this.formGroup.addControl('id', new FormControl(this.food.id, Validators.required));
    }
    this.formGroup.addControl('name', new FormControl(this.food.name, Validators.required));
    this.formGroup.addControl('description', new FormControl(this.food.description ?? null));
    this.formGroup.addControl('shortName', new FormControl(this.food.shortName ?? null));
  }
}
