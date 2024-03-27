import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from '@menu/component/card/card.component';
import { CartComponent } from './component/cart/cart.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'order',
        component: CardComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    { path: '**', redirectTo: 'order' },
    ]
  },
  { path: '**', redirectTo: 'order' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
