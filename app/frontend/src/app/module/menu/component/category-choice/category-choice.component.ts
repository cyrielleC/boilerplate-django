import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { FormControl, Validators } from '@angular/forms';
import { arraySizeValidator } from '../../../../validaror/array-size.validator';
import { DishElementWithQuantity } from '../choice-pop-up/choice-pop-up.component';

@Component({
  selector: 'app-category-choice',
  templateUrl: './category-choice.component.html',
  styleUrl: './category-choice.component.scss'
})
export class CategoryChoiceComponent implements OnInit {
  @Input({ required: true }) dishElement!: DishElementWithQuantity;
  @Output() formGroup$ : EventEmitter<FormControl> = new EventEmitter<FormControl>();
  @Output() groupHasBeenUpdated$ : EventEmitter<true> = new EventEmitter<true>();
  formControl: FormControl;

  constructor(
    protected readonly menuService: OrderService,
  ){}

  ngOnInit() {
    this.formControl = new FormControl(
      [], 
      [
        Validators.required,
        arraySizeValidator(this.dishElement.quantity, this.dishElement.quantity)
      ]
    );
    this.formGroup$.emit(this.formControl);
  }

  getElements(foodCategoryId: number) {
    return this.menuService.getCategorieElements(foodCategoryId).map((el) =>{
      return {
        'id': el.child.id,
        'name': el.child.name,
        'quantity': el.quantity, 
      };
    })
  }
}
