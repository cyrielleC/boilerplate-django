import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodNamePipe } from './food-name.pipe';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [FoodNamePipe, PricePipe, ],
  imports: [
    CommonModule
  ],
  exports: [FoodNamePipe, PricePipe, ]
})
export class PipesModule { }