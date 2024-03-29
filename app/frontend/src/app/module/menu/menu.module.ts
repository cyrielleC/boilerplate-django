import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card/card.component';
import { MenuRoutingModule } from './menu.routing.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChoicePopUpComponent } from './component/choice-pop-up/choice-pop-up.component';
import { CategoryChoiceComponent } from './component/category-choice/category-choice.component';
import { IngredientChoiceComponent } from './component/ingredient-choice/ingredient-choice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { CartMenuComponent } from '@menu/component/cart-menu/cart-menu.component';
import { ActionReducer, META_REDUCERS, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { CartComponent } from './component/cart/cart.component';
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
    CategoryChoiceComponent,
    IngredientChoiceComponent,
    CartMenuComponent,
    CartComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatMenuModule,
    SharedModule,
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
    // // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
  }
}
