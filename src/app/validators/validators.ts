import {
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormControl
} from '@angular/forms';

export class NgcValidators {
  static min(minValue: any): ValidatorFn {
    const func: ValidatorFn = (c: AbstractControl): { [key: string]: any } => {
      if (!!Validators.required(c) || (!minValue && minValue !== 0)) {
        return undefined;
      }
      const v: number = c.value;
      return v < minValue
        ? { min: { minValue: minValue, actualValue: v } }
        : undefined;
    };
    return func;
  }

  static max(maxValue: any): ValidatorFn {
    const func: ValidatorFn = (c: AbstractControl): { [key: string]: any } => {
      if (!!Validators.required(c) || (!maxValue && maxValue !== 0)) {
        return undefined;
      }
      const v: number = c.value;
      return v > maxValue
        ? { max: { maxValue: maxValue, actualValue: v } }
        : undefined;
    };
    return func;
  }

  static numberRequired(c: AbstractControl): { [key: string]: any } {
    return Number.isNaN(c.value) ? { required: true } : undefined;
  }

  /**
   * Valida a quantidade de caracteres é maior que a valor passado, ignorando pontos das casas decimais.
   * @param max Máximo de caracteres.
   * @returns {(control:AbstractControl)=>{[p: string]: any}}
   *
   */
  static maxLengthCurrency(max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c !== undefined && c.value !== undefined) {
        const value = c.value.toString();
        const newValue = value.replace('.', '');
        if (newValue.length > max) {
          return { maxLenthCustom: true };
        }
      }
      return null;
    };
  }

  /**
   * Valida se a quantidade de caracteres é menor que a valor passado, ignorando caracteres especiais.
   * @param min Mínimo de caracteres.
   * @returns {(control:AbstractControl)=>{[p: string]: any}}
   *
   */
  static minLengthCustom(min: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c !== undefined && c.value !== undefined) {
        const value = c.value.toString();
        const newValue = value.replace(/\(|\)|\.|\-|\//gi, '');
        if (newValue.length < min) {
          return { minlength: { requiredLength: min } };
        }
      }
      return null;
    };
  }

  /**
   * Valida se e-mail está  no formato correto.
   * Ex.: mail@domain.com
   * @param control controlador a ser validado.
   * @returns {(control:AbstractControl)=>{[p: string]: any}}
   */
  static mail(control: FormControl): ValidationErrors {

    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])\.[a-z0-9](([a-z0-9-]*[a-z0-9])?)(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (
      control.value &&
      (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))
    ) {
      return { invalid_email: true };
    }

    return null;
  }
}
