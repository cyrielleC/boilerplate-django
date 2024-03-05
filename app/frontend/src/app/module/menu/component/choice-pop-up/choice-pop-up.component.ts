import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ChoiceFormGroup } from '@menu/component/category-choice/category-choice.component';
import { ingredientChoiceValidator } from '@app/validaror/ingredient-choice.validator';
import { IngredientChoiceValue } from '@menu/component/ingredient-choice/ingredient-choice.component';
import { Store } from '@ngrx/store';
import { addToCartAction } from '@menu/store/menu.actions';
import { CategoryService } from '@menu/service/order.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Dish, DishElement, FoodType, Formula, FormulaExtraPrice } from '@app/model/api-recipe.models';

export interface DishElementWithQuantity extends DishElement{
  quantity: number;
}

export interface ChoicePopUp {
  name: string;
  formula: Formula;
  dishElements: DishElementWithQuantity[];
  extraPrices: FormulaExtraPrice;
}

export type ChoiceModel = 
{choice: Dish, subChoice?: IngredientChoiceValue} 
| IngredientChoiceValue[];

export type DishChoice = {
  [key in string]: ChoiceModel[]
};

export interface FormulaChoice {
  name: string;
  formula: Formula;
  dishChoice?: DishChoice;
  price?: number;
}

@Component({
  selector: 'app-choice-pop-up',
  templateUrl: './choice-pop-up.component.html',
  styleUrl: './choice-pop-up.component.scss'
})
export class ChoicePopUpComponent implements OnInit {
  foodType = FoodType;
  formGroupCat: FormGroup<{[key in string]: FormArray<ChoiceFormGroup>}> = new FormGroup({});
  formGroupIng: FormGroup<{[key in string]: FormGroup}> = new FormGroup({});
  price$: Observable<number>;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: ChoicePopUp,
    private readonly store: Store,
    private readonly menuService: CategoryService,
  ) {}
  
  ngOnInit(): void {
    this.data.dishElements.forEach((dishElement)=> {
      dishElement.food.type === FoodType.CATEGORY ?
        this.formGroupCat.addControl(dishElement.id.toString(), new FormArray<ChoiceFormGroup>([], Validators.required))
      :
        this.formGroupIng.addControl(dishElement.id.toString(), new FormGroup({}, [Validators.required, ingredientChoiceValidator()]) as FormGroup)
    });

    this.price$ = combineLatest(
      [
        this.formGroupCat.valueChanges.pipe(startWith(true)),
        this.formGroupIng.valueChanges.pipe(startWith(true))
      ]).pipe(
      map(() => this.reCalculatePrice()),
    );
  }


  reCalculatePrice(): number {
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
          price: this.reCalculatePrice()
        }
      })
    );
    this.dialogRef.close();
  }

  private getFormsValues(): DishChoice {
    return {...this.formGroupCat.value, ...this.formGroupIng.value};
  }
}
