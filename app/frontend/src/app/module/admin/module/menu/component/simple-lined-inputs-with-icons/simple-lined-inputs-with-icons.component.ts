import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-lined-inputs-with-icons',
  templateUrl: './simple-lined-inputs-with-icons.component.html',
  styleUrl: './simple-lined-inputs-with-icons.component.scss'
})
export class SimpleLinedInputsWithIconsComponent {
  @Input({ required: true }) leftIcon: string;
  @Input({ required: true }) inputsConfigs: string;

  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>();

}
