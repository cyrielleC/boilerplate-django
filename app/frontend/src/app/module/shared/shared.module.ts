import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusMinusCounterComponent } from './component/plus-minus-counter/plus-minus-counter.component';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ExpandComponent } from './component/expand/expand.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    PlusMinusCounterComponent,
    ExpandComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  exports: [
    PlusMinusCounterComponent,
  ]
})
export class SharedModule { }
