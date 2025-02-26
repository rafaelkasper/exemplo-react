import { StorageKey } from './storageKeys';

// Salvando um objeto no localStorage
export const saveObject = async <T>(
  key: StorageKey,
  object: T
): Promise<void> => {
  const jsonValue = JSON.stringify(object);
  saveValue(key, jsonValue);
};

// Salvando um valor no localStorage
export const saveValue = async (
  key: StorageKey,
  value: string
): Promise<void> => {
  localStorage.setItem(key, value);
  return;
};

// Recuperando um objeto do localStorage
export const getObject = async <T>(key: StorageKey): Promise<T | null> => {
  const jsonValue = await getValue(key);

  if (!jsonValue) return null;

  return JSON.parse(jsonValue) as T;
};

// Recuperando um valor do localStorage
export const getValue = async (key: StorageKey): Promise<string | null> => {
  return localStorage.getItem(key);
};

// Removendo um item do localStorage
export const clear = async (key: StorageKey): Promise<void> => {
  localStorage.removeItem(key);
  return;
};

// Recuperando todos os itens do localStorage ou cria valores
export const getObjectOrCreate = async <T>(
  key: StorageKey,
  createFn: () => Promise<T>
): Promise<T> => {
  const item = await getObject(key);

  if (!item) {
    const newItem = await createFn();
    await saveObject(key, newItem);
    return newItem;
  }

  return item as T;
};

// Recuperando um valor do localStorage ou cria valores
export const getValueOrCreate = async (
  key: StorageKey,
  createFn: () => Promise<string>
): Promise<string> => {
  const item = await getValue(key);

  if (!item) {
    const newItem = await createFn();
    await saveValue(key, newItem);
    return newItem;
  }

  return item;
};
