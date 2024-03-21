import { selectFoodById, selectFoodByType } from '@admin/store/recipe.selector';
import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish, Food, FoodElement, FoodIngredientCategory, FoodType, Ingredient } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit {

  dish$: Observable<Dish>;
  formGroup: FormGroup = new FormGroup({});
  foodType = FoodType;


  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private readonly dialog: Dialog,
    readonly recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.dish$ = this.store.select(selectFoodById(this.route.snapshot.params['id']))
      .pipe(
        tap((el: Food) => {
            this.formGroup = new FormGroup({
              elements: new FormControl<FoodElement<Ingredient | FoodIngredientCategory>[]>([...((el as Dish).elements ?? []).map((el) => { return {...el}})])
            });
      }),
      ) as Observable<Dish>;
  }

  drop(elements: FoodElement<Ingredient | FoodIngredientCategory>[], event: CdkDragDrop<any>) {
    moveItemInArray(elements, event.previousIndex, event.currentIndex);
  }

  remove(element: FoodElement<FoodIngredientCategory | Ingredient>) {
    this.formGroup.controls['elements'].setValue(
      [
        ...this.formGroup.controls['elements'].value.filter(
          (el: FoodElement<FoodIngredientCategory | Ingredient>) => el.child.id !== element.child.id)
      ]
    );
  }

  add(element: Food) {
    this.formGroup.controls['elements'].setValue(
      [
        ...this.formGroup.controls['elements'].value,
        {
          child: element,
          quantity: 1,
          isVisible: true,
        }
      ]
    );
  }

  alreadyInList(element: Food) {
    return this.formGroup.controls['elements'].value.some((el: FoodElement<Ingredient | FoodIngredientCategory>) => el.child.id === element.id);
  }

  createElement(type: FoodType) {
    // this.dialogRef();
  }

}
