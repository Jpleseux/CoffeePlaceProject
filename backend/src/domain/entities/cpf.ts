export default class CpfValidate {
    value: boolean;
  
    constructor(readonly cpf: string) {
      const isValidCpf = this.validate(cpf);
      if (!isValidCpf) this.value=  false;
      this.value = true;
    }
  
    isValidLength(cpf: string) {
      return cpf.length !== 11;
    }
  
    allDigitsTheSame(cpf: string) {
      return cpf.split("").every((c) => c === cpf[0]);
    }
  
    removeNonDigits(cpf: string) {
      return cpf.replace(/\D/g, "");
    }
  
    calculateDigit(cpf: string, factor: number) {
      let total = 0;
      for (const digit of cpf) {
        if (factor > 1) total += parseInt(digit) * factor--;
      }
      const rest = total % 11;
      return rest < 2 ? 0 : 11 - rest;
    }
  
    validate(cpf: string) {
      cpf = this.removeNonDigits(cpf);
      if (this.isValidLength(cpf)) return false;
      if (this.allDigitsTheSame(cpf)) return false;
      const dg1 = this.calculateDigit(cpf, 10);
      const dg2 = this.calculateDigit(cpf, 11);
      let actualCheckDigit = cpf.slice(9);
      const calculatedCheckDigit = `${dg1}${dg2}`;
      return actualCheckDigit === calculatedCheckDigit;
    }
  
    static validateCpf(cpf: string): string | false {
      const cpfObj = new CpfValidate(cpf);
      return cpfObj.validate(cpf) ? cpf : false;
    }
  }
  