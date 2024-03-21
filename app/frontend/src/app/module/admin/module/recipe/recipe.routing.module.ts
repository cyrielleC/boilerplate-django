import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './component/recipe-list/recipe-list.component';
import { FoodType } from '@app/model/api-recipe.models';
import { DishFormComponent } from './component/dish-form/dish-form.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
  },
  {
    path: 'food',
    children: [
      {
        path: FoodType.DISH.toLowerCase(),
        children: [
          {
            path: ':id',
            component: DishFormComponent,
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
