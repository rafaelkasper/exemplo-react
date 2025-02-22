import React from 'react';

import { LoaderContainer, Spinner } from './styles';

export const LoadingScreen: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};
