import React from 'react';

import { LoaderContainer, Spinner } from './styles';

// Componente simples para tela de carregamento
export const LoadingScreen: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};
