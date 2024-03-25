import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dish, Food, FoodDishCategory, FoodElement, FoodIngredientCategory, FoodType } from '@app/model/api-recipe.models';
import { FoodNamePopUpComponent } from '../food-name-pop-up/food-name-pop-up.component';
import { RecipeService } from '../../service/recipe.service';


@Component({
  selector: 'app-food-elements-input',
  templateUrl: './food-elements-input.component.html',
  styleUrl: './food-elements-input.component.scss'
})
export class FoodElementsInputComponent {
  @Input({ required: true }) set choices( choices: {[key in FoodType]?: Food[]} | null) {
    this.categories = choices;
    this.allFoods = Object.values(this.categories ?? []).flatMap(foods => foods || []);
  }

  @Input({ required: true }) set formGroupAndFood([formGroup, food]: [FormGroup, Dish | FoodDishCategory | FoodIngredientCategory]) {
    if (!this.formControl) {
      this.formControl = new FormControl();
      formGroup.addControl('elements', this.formControl);
    }
    this.formControl.setValue([
      ...(food.elements ?? [])
        .map((foodEl: FoodElement<Food>) => 
          { 
            console.log(foodEl);
            return {
              ...foodEl,
              child: foodEl.child.id,
            }
          })
    ]);
  }

  formControl: FormControl<FoodElement<number>[]>;
  allFoods: Food[];
  categories: {[key in FoodType]?: Food[]} | null;
  foodType = FoodType;
 
  constructor(
    private readonly dialog: Dialog,
    readonly recipeService: RecipeService,
  ) {
  }

  drop(elements: FoodElement<number>[], event: CdkDragDrop<any>) {
    moveItemInArray(elements, event.previousIndex, event.currentIndex);
    this.updateOrder();
  }

  remove(element: FoodElement<Food>) {
    this.formControl.setValue(
      [
        ...this.formControl.value.filter(
          (el: FoodElement<number>) => el.child !== element.child.id)
      ]
    );
    this.updateOrder();
  }

  add(element: Food) {
    this.formControl.setValue(
      [
        ...this.formControl.value,
        {
          child: element.id,
          quantity: 1,
          isVisible: true,
          order: -1,
        }
      ]
    );
    this.updateOrder();
  }

  alreadyInList(element: Food) {
    return this.formControl.value.some((el: FoodElement<number>) => el.child === element.id);
  }
  
  getElement(element: FoodElement<number>): FoodElement<Food> {
    return {
      ...element, 
      child: this.allFoods.find((el) => el.id === element.child)!
    };
  }

  createElement(type: FoodType) {
    this.dialog.open<string>(FoodNamePopUpComponent, {
      width: '50%',
      data: {
        type,
      }
    });  
  }

  private updateOrder() {
    this.formControl.setValue((this.formControl.value ?? []).map((el: FoodElement<number>, index: number) => {
      return {
        ...el,
        order: index,
      }}
    ));
  }
}
