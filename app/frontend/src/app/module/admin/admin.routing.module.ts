import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetObjectsGuard } from '../../guard/get-object.guard.';
import { getCategoryAction, getDishAction } from '../../store/action/recipe.actions';
import { selectCategories, selectDishes } from '../../store/selector/recipe.selector';

const routes: Routes = [
  {
    path: 'recipe',
    canActivate: [GetObjectsGuard],
    data: {
      objectsConfig: [
        [selectCategories, getCategoryAction()],
        [selectDishes, getDishAction()]
      ],
    },
    loadChildren: () => import('./module/recipe/recipe.module').then(m => m.RecipeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
