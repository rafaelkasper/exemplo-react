import { useCallback, useEffect, useRef } from 'react';

// Hook para verificar se o componente está montado
// Útil para evitar memory leaks
export const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};
