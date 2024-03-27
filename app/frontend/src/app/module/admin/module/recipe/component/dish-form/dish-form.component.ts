import { selectFoodById } from '@admin/store/recipe.selector';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish, Food, FoodType } from '@app/model/api-recipe.models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { RecipeService } from '../../service/recipe.service';
import { deleteFoodAction, updateFoodAction } from '@admin/store/recipe.actions';
import { combineLatest, map } from 'rxjs';
import { navigateAction } from '@app/store/router.actions';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent implements OnInit {

  dish$: Observable<Dish>;
  formGroup: FormGroup = new FormGroup({});
  foodType = FoodType;
  subElements: FoodType[];

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
            this.subElements = {
              [FoodType.CATEGORY_D]: [FoodType.CATEGORY_D, FoodType.DISH],
              [FoodType.CATEGORY_I]: [FoodType.INGREDIENT, FoodType.CATEGORY_I],
              [FoodType.DISH]: [FoodType.INGREDIENT, FoodType.CATEGORY_I],
              [FoodType.INGREDIENT]: [],
            }[el.type];
        }),
      ) as Observable<Dish>;
  }

  combineChoices(): Observable<{ [key in FoodType]?: Food[] }> {
    const observables: (Observable<Food[]>)[] = this.subElements.map(type => this.recipeService.data$[type]);

    return combineLatest(observables).pipe(
      map(dataArray => {
        const choices: { [key in FoodType]?: any } = {};
        this.subElements.forEach((type, index) => {
          choices[type] = dataArray[index];
        });
        return choices;
      })
    );
  }

  save() {
    // this.formGroup.controls['elements'].setValue((this.formGroup.controls['elements'].value ?? []).map((el: FoodElement<Food>, index: number) => {
    //   return {
    //     ...el,
    //     order: index,
    //   }}
    // ));
    this.store.dispatch(updateFoodAction({food: {
      ...this.formGroup.value,
      elements: [...this.formGroup.controls['elements']?.value ?? []]
    }} ));
  }
  delete(food: Food) {
    this.store.dispatch(navigateAction({route: ['../..']}));
    this.store.dispatch(deleteFoodAction({food}));
  }

}
