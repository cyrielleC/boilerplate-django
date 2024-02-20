import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { MenuRoutingModule } from './menu.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormulaComponent } from './component/formula/formula.component';
import { PipesModule } from '../../pipe/pipe.module';
import { FormulaChoicePopUpComponent } from './component/formula-choice-pop-up/formula-choice-pop-up.component';
import { AddToCartButtonComponent } from './component/add-to-cart-button/add-to-cart-button.component';

@NgModule({
  declarations: [
    CardComponent,
    FormulaComponent,
    FormulaChoicePopUpComponent,
    AddToCartButtonComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule,
    MatExpansionModule,
    PipesModule,
  ]
})
export class MenuModule { }
