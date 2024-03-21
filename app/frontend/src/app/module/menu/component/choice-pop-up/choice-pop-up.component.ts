import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ChoiceFormGroup } from '@menu/component/category-choice/category-choice.component';
import { ingredientChoiceValidator } from '@app/validaror/ingredient-choice.validator';
import { Store } from '@ngrx/store';
import { addToCartAction } from '@menu/store/menu.actions';
import { CategoryService } from '@menu/service/order.service';
import { Observable, map, startWith } from 'rxjs';
import { CATEGORIES, Dish, FoodType } from '@app/model/api-recipe.models';
import { formArraySizeValidator } from '@app/validaror/form-array-size.validator';
import { ChoicePopUp } from '@app/model/local-recipe.models';
import { DishChoice } from '@app/model/local-recipe.models';

@Component({
  selector: 'app-choice-pop-up',
  templateUrl: './choice-pop-up.component.html',
  styleUrl: './choice-pop-up.component.scss'
})
export class ChoicePopUpComponent implements OnInit {
  categoryTypes = CATEGORIES;
  formGroup: FormGroup<{[key in string]: FormArray<FormArray<ChoiceFormGroup>>}> = new FormGroup({});
  price$: Observable<number>;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ChoicePopUp,
    private readonly store: Store,
    private readonly menuService: CategoryService,
  ) {}
  
  ngOnInit(): void {
    this.data.formulaElementWithDish.forEach((formulaElWithdishElement)=> {
      this.formGroup.addControl(formulaElWithdishElement.id.toString(), new FormArray<FormArray<ChoiceFormGroup>>([], formArraySizeValidator(formulaElWithdishElement.quantity, formulaElWithdishElement.quantity)));
      if (formulaElWithdishElement.dishElement.food.type === FoodType.DISH) {
        for (let i = 0; i < formulaElWithdishElement.quantity; i++) {
          this.formGroup.controls[formulaElWithdishElement.id.toString()].push(
            new FormArray<ChoiceFormGroup>([
              new FormGroup(
                {
                  choice: new FormControl(formulaElWithdishElement.dishElement.food as Dish),
                  subChoice:  new FormGroup({}, ingredientChoiceValidator())
                }
              ) as ChoiceFormGroup
          ]));
        }
      }
    });

    this.price$ = this.formGroup.valueChanges.pipe(startWith(true)).pipe(
      map(() => this.reCalculatePrice()),
    );
  }

  reCalculatePrice(): number {
    console.log(this.formGroup);
    return this.data.formula.price 
      + this.menuService
          .calculateExtraPrice(this.data.extraPrices, this.getFormsValues());
  }

  submit(): void {
    this.store.dispatch(
      addToCartAction({
        element : {
          name: this.data.name,
          formula: this.data.formula,
          dishChoice: this.getFormsValues(),
          price: this.reCalculatePrice(),
          extraPrices: this.data.extraPrices
        }
      })
    );
    this.dialogRef.close();
  }

  private getFormsValues(): DishChoice {
    // @ts-ignore
    return {...this.formGroup.value} as DishChoice;
  }
}
