import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './price.pipe';
import { IngredientListPipe } from './ingredient-list.pipe';
import { ChoiceNamePipe } from './choice-name.pipe';
import { ReplacePipe } from './replace.pipe';

@NgModule({
  declarations: [PricePipe, IngredientListPipe, ChoiceNamePipe, ReplacePipe, ],
  imports: [
    CommonModule
  ],
  exports: [PricePipe, IngredientListPipe, ChoiceNamePipe, ReplacePipe, ]
})
export class PipesModule { }