import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFood, Food } from '@app/model/api-recipe.models';

type formGroupKeys = keyof Pick<AbstractFood, 'name' | 'description' | 'shortName'>;

@Component({
  selector: 'app-basic-food-form',
  templateUrl: './basic-food-form.component.html',
  styleUrl: './basic-food-form.component.scss'
})
export class BasicFoodFormComponent implements OnInit {
  @Input() food: Partial<Food> = {
    name: '',
    description: '',
    shortName: '',
  };
  @Input({ required: true }) formGroup: FormGroup<{
    [el in formGroupKeys]: FormControl;
  }>;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.food.name, Validators.required),
      description: new FormControl(this.food.description ?? ''),
      shortName: new FormControl(this.food.shortName ?? ''),
    });
  }
}
