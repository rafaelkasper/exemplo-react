import { useRef } from 'react';

// Hook para verificar se é a primeira renderização do componente
// Útil para executar ações apenas na primeira renderização
export const useFirstRender = (): boolean => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
};
