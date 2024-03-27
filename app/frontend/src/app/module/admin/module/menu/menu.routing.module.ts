import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEditionComponent } from './component/card-edition/card-edition.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryEditionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
