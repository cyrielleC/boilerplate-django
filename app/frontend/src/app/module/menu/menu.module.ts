import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { MenuRoutingModule } from './menu.routing.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PipesModule } from '../../pipe/pipe.module';
import { ChoicePopUpComponent } from './component/choice-pop-up/choice-pop-up.component';
import { AddToCartButtonComponent } from './component/add-to-cart-button/add-to-cart-button.component';
import { MatRadioModule } from '@angular/material/radio';
import { CategoryChoiceComponent } from './component/category-choice/category-choice.component';
import { IngredientChoiceComponent } from './component/ingredient-choice/ingredient-choice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CartMenuComponent } from '@menu/component/cart-menu/cart-menu.component';
import { ActionReducer, META_REDUCERS, MetaReducer, StoreModule } from '@ngrx/store';
import { reducer as menuReducer } from '@menu/store/menu.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MatBadgeModule } from '@angular/material/badge';
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
    MenuRoutingModule,
  ],  
  providers: [
    { provide: META_REDUCERS, useFactory: localStorageSyncReducer, multi: true }
  ]
})
export class MenuModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');
    console.log('coucocu');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('admin/fr');
  }
}
