export const getItemLocalStorage = (item: string) => {
  let settings = null;

  try {
    const storedData: string | null = localStorage.getItem(item);

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};
