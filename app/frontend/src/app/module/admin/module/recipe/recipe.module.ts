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
import { PipesModule } from '@app/pipe/pipe.module';
import { FoodElementsInputComponent } from './component/food-elements-input/food-elements-input.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    DishFormComponent,
    FoodNamePopUpComponent,
    BasicFoodFormComponent,
    FoodElementsInputComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    TranslateModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PipesModule,
  ]
})
export class RecipeModule { }
