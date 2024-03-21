import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './component/recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DishFormComponent } from './component/dish-form/dish-form.component';
import { FoodNamePopUpComponent } from './component/food-name-pop-up/food-name-pop-up.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BasicFoodFormComponent } from './component/basic-food-form/basic-food-form.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { SharedModule } from '@app/module/shared/shared.module';
import { FoodElementPickAndOrderComponent } from './component/food-element-pick-and-order/food-element-pick-and-order.component';
import { PipesModule } from '@app/pipe/pipe.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    DishFormComponent,
    FoodNamePopUpComponent,
    BasicFoodFormComponent,
    FoodElementPickAndOrderComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDropList,
    CdkDrag,
    PipesModule,
  ]
})
export class RecipeModule { }
