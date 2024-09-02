
export function validateCEP(cep: string) {
  const cepRegex = /^\d{5}-\d{3}$/;
  return cepRegex.test(cep);
}


export function validateCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const digits = cpf.split('').map(x => parseInt(x));

  for (let j = 0; j < 2; j++) {
    let sum = 0;
    for (let i = 0; i < 9 + j; i++) {
      sum += digits[i] * (10 + j - i);
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit === 10 || checkDigit === 11) {
      checkDigit = 0;
    }
    if (checkDigit !== digits[9 + j]) {
      return false;
    }
  }
  return true;
}

export function validatePhone(phone: string) {
  const phoneRegex = /^(\(?\d{2}\)?\s?)(\d{4,5}-?\d{4})$/;
  return phoneRegex.test(phone);
}
export function validateRG(rg: string) {
  const rgRegex = /^(\d{1,2})\.?(\d{3})\.?(\d{3})-?(\d|X|x)$/;
  return rgRegex.test(rg);
}


export function formatCEP(cep: string) {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}


export function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


export function formatRG(rg: string) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
}