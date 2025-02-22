export const normalizeSearch = (search: string) => {
  return search
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};
