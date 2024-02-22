import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { MenuRoutingModule } from './menu.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { PipesModule } from '../../pipe/pipe.module';
import { ChoicePopUpComponent } from './component/choice-pop-up/choice-pop-up.component';
import { AddToCartButtonComponent } from './component/add-to-cart-button/add-to-cart-button.component';
import {MatRadioModule} from '@angular/material/radio';
import { CategoryChoiceComponent } from './component/category-choice/category-choice.component';
import { IngredientChoiceComponent } from './component/ingredient-choice/ingredient-choice.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardComponent,
    ChoicePopUpComponent,
    AddToCartButtonComponent,
    CategoryChoiceComponent,
    IngredientChoiceComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule,
    MatExpansionModule,
    PipesModule,
    MatRadioModule,
    ReactiveFormsModule,
  ]
})
export class MenuModule { }
