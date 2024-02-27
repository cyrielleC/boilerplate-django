import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ingredientChoiceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!(control instanceof FormGroup) || Object.keys(control.controls).length) {
            return null;
        }
        return {ingredientChoice: true};
    }
  } 