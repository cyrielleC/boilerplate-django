import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientListPipe } from './ingredient-list.pipe';
import { ChoiceNamePipe } from './choice-name.pipe';
import { ReplacePipe } from './replace.pipe';

@NgModule({
  declarations: [IngredientListPipe, ChoiceNamePipe, ReplacePipe, ],
  imports: [
    CommonModule
  ],
  exports: [IngredientListPipe, ChoiceNamePipe, ReplacePipe, ]
})
export class PipesModule { }