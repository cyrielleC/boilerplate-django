import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validateur personnalisé pour la taille d'un FormArray
export function arraySizeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!(control instanceof FormArray)) {
            return null;
        }
        const arrayLength = control.length;
        if (arrayLength < min || arrayLength > max) {
            return { arraySize: true };
        }
        return null;
    }
  }

  