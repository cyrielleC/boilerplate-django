import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-choice-input',
  templateUrl: './choice-input.component.html',
  styleUrl: './choice-input.component.scss'
})
export class ChoiceInputComponent {
  @Input({ required: true }) formControl!: FormControl;
  @Input({ required: true }) quantity!: number;
  @Input({ required: true }) elements!: {id: number, name: string, quantity?: number}[];

  getQuantity(id: number) {
    return this.formControl.value.filter((el: number) => el === id).length;
  }

  removeElement(id: number) {
    this.formControl.value.splice(
      this.formControl.value.lastIndexOf(id),1
    );
    this.updateValue();
  }

  addElement(id: number) {
    this.formControl.value.push(id);
    this.updateValue();
  }

  private updateValue() {
    this.formControl.setValue([...this.formControl.value]);
  }
}
