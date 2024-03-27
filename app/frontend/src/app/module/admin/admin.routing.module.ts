import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetObjectsGuard } from '../../guard/get-object.guard.';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { selectFoodByType } from './store/recipe.selector';
import { getFoodAction } from './store/recipe.actions';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'recipe',
        canActivate: [GetObjectsGuard],
        data: {
          objectsConfig: [
            [selectFoodByType(), getFoodAction()],
          ],
        },
        loadChildren: () => import('./module/recipe/recipe.module').then(m => m.RecipeModule)
      },
      {
        path: 'menu',
        canActivate: [GetObjectsGuard],
        data: {
          objectsConfig: [
            [selectFoodByType(), getFoodAction()],
          ],
        },
        loadChildren: () => import('./module/menu/menu.module').then(m => m.MenuModule)
      },
      { path: '**', redirectTo: 'recipe' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
