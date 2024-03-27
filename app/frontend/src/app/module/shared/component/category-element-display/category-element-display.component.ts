import { Component, Input } from '@angular/core';
import { Category, CategoryElement, FoodType } from '@app/model/api-recipe.models';

@Component({
  selector: 'app-category-element-display',
  templateUrl: './category-element-display.component.html',
  styleUrl: './category-element-display.component.scss'
})
export class CategoryElementDisplayComponent {
  @Input({ required: true }) categoryElement!: CategoryElement;
  @Input({ required: true }) category: Category;
  foodType = FoodType;

}
