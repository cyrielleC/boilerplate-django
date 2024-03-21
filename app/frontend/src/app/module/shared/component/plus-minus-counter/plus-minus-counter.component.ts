import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-plus-minus-counter',
  templateUrl: './plus-minus-counter.component.html',
  styleUrl: './plus-minus-counter.component.scss'
})
export class PlusMinusCounterComponent {
  @Input({ required: true }) quantity!: number;
  @Input({ required: true }) available!: number;
  @Input() min: number = 0;
  @Output() addElement: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeElement: EventEmitter<void> = new EventEmitter<void>();
}
