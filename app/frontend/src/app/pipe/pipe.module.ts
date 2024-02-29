import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodNamePipe } from './food-name.pipe';
import { PricePipe } from './price.pipe';
import { IngredientListPipe } from './ingredient-list.pipe';
import { ChoiceNamePipe } from './choice-name.pipe';

@NgModule({
  declarations: [FoodNamePipe, PricePipe, IngredientListPipe, ChoiceNamePipe, ],
  imports: [
    CommonModule
  ],
  exports: [FoodNamePipe, PricePipe, IngredientListPipe, ChoiceNamePipe, ]
})
export class PipesModule { }