// Remove caracteres especiais e acentos de uma string
export const normalizeSearch = (search: string) => {
  return search
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};
