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
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { CartMenuComponent } from '@menu/component/cart-menu/cart-menu.component';
import { ActionReducer, META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { reducer as menuReducer } from '@menu/store/menu.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './component/cart/cart.component';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './store/menu.effect';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {keys: ['order'], rehydrate: true}
  )(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    CardComponent,
    ChoicePopUpComponent,
    AddToCartButtonComponent,
    CategoryChoiceComponent,
    IngredientChoiceComponent,
    CartMenuComponent,
    CartComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule,
    MatExpansionModule,
    PipesModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    SharedModule,
    MatButtonToggleModule,
    MatButtonModule,
    CdkAccordionModule,
    MatBadgeModule,
    StoreModule.forFeature('menu', menuReducer, {
      metaReducers: [localStorageSyncReducer]
    }),
    EffectsModule.forFeature(MenuEffects),
  ],
  providers: [
    { provide: META_REDUCERS, useFactory: localStorageSyncReducer, multi: true }
  ]
})
export class MenuModule { }
