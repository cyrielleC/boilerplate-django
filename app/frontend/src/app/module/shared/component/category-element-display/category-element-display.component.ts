import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, CategoryElement, FoodType, Formula } from '@app/model/api-recipe.models';

@Component({
  selector: 'app-category-element-display',
  templateUrl: './category-element-display.component.html',
  styleUrl: './category-element-display.component.scss'
})
export class CategoryElementDisplayComponent {
  @Input({ required: true }) categoryElement!: CategoryElement;
  @Input({ required: true }) category: Category;
  @Output() addToCart: EventEmitter<[Formula, string]> = new EventEmitter<[Formula, string]>();
  foodType = FoodType;
}
