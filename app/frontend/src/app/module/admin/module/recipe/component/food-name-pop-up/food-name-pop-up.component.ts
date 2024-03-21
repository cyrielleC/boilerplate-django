import { createFoodAction } from '@admin/store/recipe.actions';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Food, FoodType } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-food-name-pop-up',
  templateUrl: './food-name-pop-up.component.html',
  styleUrl: './food-name-pop-up.component.scss'
})
export class FoodNamePopUpComponent {

  formGroup: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {type: FoodType},
    private readonly store: Store,
  ) {
  }

  submit() {
    this.store.dispatch(createFoodAction({food: this.formGroup.value}));
    this.dialogRef.close();
  }
  
}
