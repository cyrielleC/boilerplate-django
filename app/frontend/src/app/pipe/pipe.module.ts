import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodNamePipe } from './food-name.pipe';
import { PricePipe } from './price.pipe';
import { IngredientListPipe } from './ingredient-list.pipe';

@NgModule({
  declarations: [FoodNamePipe, PricePipe, IngredientListPipe, ],
  imports: [
    CommonModule
  ],
  exports: [FoodNamePipe, PricePipe, IngredientListPipe]
})
export class PipesModule { }