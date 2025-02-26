// Remove todos os caracteres não numéricos
export const removeCaracters = (cpfcnpj: string) => {
  return cpfcnpj.replace(/\D/g, '');
};

// Formata um CPF ou CNPJ
export const formatCpfCnpj = (cpfCnpj: string) => {
  cpfCnpj = removeCaracters(cpfCnpj);

  if (cpfCnpj.length <= 11) {
    return cpfCnpj
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  }

  return cpfCnpj
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};
