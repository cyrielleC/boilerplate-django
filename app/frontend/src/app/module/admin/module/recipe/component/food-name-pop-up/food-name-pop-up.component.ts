import { createFoodAction, deleteFoodAction, updateFoodAction } from '@admin/store/recipe.actions';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Food, FoodType } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-food-name-pop-up',
  templateUrl: './food-name-pop-up.component.html',
  styleUrl: './food-name-pop-up.component.scss'
})
export class FoodNamePopUpComponent {

  formGroup: FormGroup = new FormGroup({});
  food: Partial<Food> = this.data.food ?? {
    name: '',
    description: '',
    shortName: '',
  };
  createOrUpdate: 'UPDATE' | 'CREATE' = this.data.food ? 'UPDATE' : 'CREATE';

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: {type?: FoodType, food?: Food},
    private readonly store: Store,
  ) {
  }

  submit() {
    const food = {
        ...this.formGroup.value,
        elements: [],
    };
    this.store.dispatch(this.food.id ?
      updateFoodAction({
        food
      }) :
      createFoodAction(
        {
          food: {
            ...food,
            type: this.data.type
          }
      })
    );
    this.dialogRef.close();
  }

  delete(food: Partial<Food>) {
    this.store.dispatch(deleteFoodAction({food}));
    this.dialogRef.close();
  }
}
