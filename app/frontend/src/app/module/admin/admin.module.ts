import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/recipe.reducer';
import { RecipeEffects } from './store/recipe.effect';
import { EffectsModule } from '@ngrx/effects';

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }


@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule,
    MatTabsModule,
    StoreModule.forFeature('recipe', recipeReducer),
    EffectsModule.forFeature([RecipeEffects]),
  ],
  exports: [TranslateModule]
})
export class AdminModule { 
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');
    console.log('coucouc');
     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('admin/fr');
  }
}
