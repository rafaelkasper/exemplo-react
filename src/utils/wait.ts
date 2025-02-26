// Realiza uma pausa de tempo
export const wait = (time: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, time));
};
