import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validateur personnalisé pour la taille d'un FormArray
export function formControlArraySizeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!(control instanceof FormControl)) {
            return null;
        }
        const arrayLength = control.value.length;
        if (arrayLength < min || arrayLength > max) {
            return { formControlrraySize: true };
        }
        return null;
    }
  }

  