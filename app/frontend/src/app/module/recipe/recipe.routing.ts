import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { foodCategoryGuard } from '../../guard/food-category.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [foodCategoryGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
