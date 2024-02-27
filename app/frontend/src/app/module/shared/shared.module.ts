import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusMinusCounterComponent } from './component/plus-minus-counter/plus-minus-counter.component';



@NgModule({
  declarations: [
    PlusMinusCounterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlusMinusCounterComponent,
  ]
})
export class SharedModule { }
