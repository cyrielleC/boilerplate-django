import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusMinusCounterComponent } from './component/plus-minus-counter/plus-minus-counter.component';
import { ChoiceInputComponent } from './component/choice-input/choice-input.component';



@NgModule({
  declarations: [
    PlusMinusCounterComponent,
    ChoiceInputComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlusMinusCounterComponent,
    ChoiceInputComponent,
  ]
})
export class SharedModule { }
