import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

export class CpfCnpjValidator implements Validator {
  static cpfLength = 11;
  static cnpjLength = 14;

  /**
   * Calcula o dígito verificador do CPF ou CNPJ.
   */
  static buildDigit(arr: number[]): number {
    const isCpf = arr.length < CpfCnpjValidator.cpfLength;
    const digit =
      arr
        .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
        .reduce((total, current) => total + current) %
      CpfCnpjValidator.cpfLength;

    return digit < 2 ? 0 : CpfCnpjValidator.cpfLength - digit;

  }

  /**
   * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
   */
  static validate(c: AbstractControl): ValidationErrors | null {
    const cpfCnpj = c.value.replace(/\D/g, '');

    // Verifica o tamanho da string.
    if (
      [
        CpfCnpjValidator.cpfLength,
        CpfCnpjValidator.cnpjLength
      ].indexOf(cpfCnpj.length) < 0
    ) {
      return { length: true };
    }

    // Verifica se todos os dígitos são iguais.
    if (/^([0-9])\1*$/.test(cpfCnpj)) {
      return { equalDigits: true };
    }

    // A seguir é realizado o cálculo verificador.
    const cpfCnpjArr: number[] = cpfCnpj
      .split('')
      .reverse()
      .slice(2);

    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));

    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
      // Dígito verificador não é válido, resultando em falha.
      return { digit: true };
    }

    return null;
  }

  /**
   * Implementa a interface de um validator.
   */
  validate(c: AbstractControl): ValidationErrors | null {
    return CpfCnpjValidator.validate(c);
  }

  // static isValidCpf(): any {
  //   return (control: AbstractControl): Validators => {
  //     const cpf = control.value;
  //     if (cpf) {
  //       let numbers, digits, sum, i, result, equalDigits;
  //       equalDigits = 1;
  //       if (cpf.length < 11) {
  //         return null;
  //       }

  //       for (i = 0; i < cpf.length - 1; i++) {
  //         if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
  //           equalDigits = 0;
  //           break;
  //         }
  //       }

  //       if (!equalDigits) {
  //         numbers = cpf.substring(0, 9);
  //         digits = cpf.substring(9);
  //         sum = 0;
  //         for (i = 10; i > 1; i--) {
  //           sum += numbers.charAt(10 - i) * i;
  //         }

  //         result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  //         if (result !== Number(digits.charAt(0))) {
  //           return { cpfNotValid: true };
  //         }
  //         numbers = cpf.substring(0, 10);
  //         sum = 0;

  //         for (i = 11; i > 1; i--) {
  //           sum += numbers.charAt(11 - i) * i;
  //         }
  //         result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  //         if (result !== Number(digits.charAt(1))) {
  //           return { cpfNotValid: true };
  //         }
  //         return null;
  //       } else {
  //         return { cpfNotValid: true };
  //       }
  //     }
  //     return null;
  //   };
  // }
}
