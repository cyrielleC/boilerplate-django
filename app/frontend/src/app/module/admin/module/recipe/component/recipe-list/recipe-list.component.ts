import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FoodType } from '@app/model/api-recipe.models';
import { FoodNamePopUpComponent } from '../food-name-pop-up/food-name-pop-up.component';
import { RecipeService } from '../../service/recipe.service';

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
  ) {
  }

  createFood(type: FoodType): void {
    this.dialog.open<string>(FoodNamePopUpComponent, {
      // width: '50%',
      data: {
        type,
      }
    });
  }

}
