import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './component/recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe.routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    MatTabsModule,
    TranslateModule,
  ]
})
export class RecipeModule { }
