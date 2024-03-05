import { Pipe, PipeTransform } from '@angular/core';
import { Category, CategoryElement, FoodType } from '@app/model/api-recipe.models';

@Pipe({
  name: 'choiceName'
})
export class ChoiceNamePipe implements PipeTransform {

  transform(categoryElement: CategoryElement, category: Category | null = null ): string {
    return categoryElement.name ?? 
      (
        categoryElement.elements[0].food.type === FoodType.DISH ?
          categoryElement.elements[0].food.name : category?.name
      ) ?? '';
  }

}
