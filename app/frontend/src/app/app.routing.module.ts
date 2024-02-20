import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminAuthenticatedGuard } from './guard/auth.guard';
import { GetObjectsGuard } from './guard/get-object.guard.';
import { getRestaurantAction } from './store/action/menu.actions';
import { selectRestaurant } from './store/selector/recipe.selector';

const routes: Routes = [
  {
    path: 'admin/:path',
    canActivate: [IsAdminAuthenticatedGuard],
    loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule)
  },  
  {
    path: 'order',
    canActivate: [GetObjectsGuard],
    data: {
      objectsConfig: [
        [selectRestaurant, getRestaurantAction()],
      ],
    },
    loadChildren: () => import('./module/menu/menu.module').then(m => m.MenuModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
