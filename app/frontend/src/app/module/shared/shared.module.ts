import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusMinusCounterComponent } from './component/plus-minus-counter/plus-minus-counter.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ExpandComponent } from './component/expand/expand.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChoiceListComponent } from './component/choice-list/choice-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@app/pipe/pipe.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryElementDisplayComponent } from './component/category-element-display/category-element-display.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    PlusMinusCounterComponent,
    ExpandComponent,
    ChoiceListComponent,
    CategoryElementDisplayComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule, 
    PipesModule,
    MatExpansionModule,
    CdkDropList,
    CdkDrag,
  ],
  exports: [
    PlusMinusCounterComponent,
    ChoiceListComponent,
    CategoryElementDisplayComponent,
    CdkDropList,
    CdkDrag,
  ]
})
export class SharedModule { }
