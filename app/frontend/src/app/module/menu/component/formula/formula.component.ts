import { Component, Input } from '@angular/core';
import { FoodType, Formula, FormulaType } from '../../../../model/recipe.models';


@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrl: './formula.component.scss'
})
export class FormulaComponent {
  @Input({ required: true }) formula!: Formula;
  foodType = FoodType;
  // priceSet: FormulaType[] = [FormulaType.allPrice, FormulaType.price, FormulaType.dishDessertPrice,FormulaType.starterDishPrice];
  priceSet = FormulaType;
  elements: (keyof Pick<Formula, 'starter' | 'food' | 'dessert'>)[]
    = ['starter', 'food', 'dessert'];
}