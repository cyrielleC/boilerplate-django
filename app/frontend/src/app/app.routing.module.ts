import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetObjectsGuard } from '@app/guard/get-object.guard.';
import { getRestaurantAction } from '@menu/store/menu.actions';
import { selectRestaurant } from '@menu/store/menu.selector';
import { IsAdminAuthenticatedGuard } from '@app/guard/auth.guard';

const routes: Routes = [
  {
    path: 'admin/:path',
    canActivate: [IsAdminAuthenticatedGuard],
    loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule)
  },  
  {
    path: 'menu',
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
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    // ...any other options you'd like to use
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
