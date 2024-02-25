import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validateur personnalisé pour la taille d'un FormArray
export function arraySizeValidator(min: number, max: number): ValidatorFn {
    console.log('test');
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control);
        if (!(control instanceof FormControl)) {
            return null;
        }
        const arrayLength = control.value.length;
        if (arrayLength < min || arrayLength > max) {
            return { arraySize: true };
        }
        return null;
    }
  }
  