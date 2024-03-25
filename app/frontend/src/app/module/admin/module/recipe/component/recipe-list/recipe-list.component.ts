import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Food, FoodType } from '@app/model/api-recipe.models';
import { FoodNamePopUpComponent } from '../food-name-pop-up/food-name-pop-up.component';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {


  foodType = FoodType;

  constructor(
    private readonly dialog: Dialog,
    readonly recipeService: RecipeService,
    readonly router: Router,
    readonly route: ActivatedRoute,
  ) {
  }

  createFood(type: FoodType): void {
    this.dialog.open<string>(FoodNamePopUpComponent, {
      width: '50%',
      data: {
        type,
      }
    });
  }
  updateFood(food: Food): void {
    if (food.type !== FoodType.INGREDIENT) {
      this.router.navigate(['./food/' + food.id], {relativeTo: this.route})
      return;
    }
    this.dialog.open<string>(FoodNamePopUpComponent, {
      width: '50%',
      data: {
        food,
      }
    });

  }

}
